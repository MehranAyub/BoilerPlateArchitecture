using ERP.Entities;

using System;
using System.Linq;
using System.Linq.Dynamic.Core;
using Abp.Linq.Extensions;
using System.Collections.Generic;
using System.Threading.Tasks;
using Abp.Domain.Repositories;
using ERP.Entities.Dtos;
using ERP.Dto;
using Abp.Application.Services.Dto;
using ERP.Authorization;
using Abp.Extensions;
using Abp.Authorization;
using Microsoft.EntityFrameworkCore;
using Abp.UI;
using ERP.Storage;

namespace ERP.Entities
{
    [AbpAuthorize(AppPermissions.Pages_PropertyFileses)]
    public class PropertyFilesesAppService : ERPAppServiceBase, IPropertyFilesesAppService
    {
        private readonly IRepository<PropertyFiles> _propertyFilesRepository;
        private readonly IRepository<Property, Guid> _lookup_propertyRepository;

        public PropertyFilesesAppService(IRepository<PropertyFiles> propertyFilesRepository, IRepository<Property, Guid> lookup_propertyRepository)
        {
            _propertyFilesRepository = propertyFilesRepository;
            _lookup_propertyRepository = lookup_propertyRepository;

        }

        public virtual async Task<PagedResultDto<GetPropertyFilesForViewDto>> GetAll(GetAllPropertyFilesesInput input)
        {

            var filteredPropertyFileses = _propertyFilesRepository.GetAll()
                        .Include(e => e.PropertyFk).Where(x => x.PropertyId == input.PropertyId)
                        .WhereIf(!string.IsNullOrWhiteSpace(input.Filter), e => false || e.FileName.Contains(input.Filter) || e.FileType.Contains(input.Filter));

            var pagedAndFilteredPropertyFileses = filteredPropertyFileses
                .OrderBy(input.Sorting ?? "id desc")
                .PageBy(input);

            var propertyFileses = from o in pagedAndFilteredPropertyFileses
                                  join o1 in _lookup_propertyRepository.GetAll() on o.PropertyId equals o1.Id into j1
                                  from s1 in j1.DefaultIfEmpty()

                                  select new
                                  {

                                      o.FileName,
                                      Id = o.Id,
                                      o.ImageBytes,
                                      PropertyPropertySpecs = s1 == null || s1.PropertySpecs == null ? "" : s1.PropertySpecs.ToString()
                                  };

            var totalCount = await filteredPropertyFileses.CountAsync();

            var dbList = await propertyFileses.ToListAsync();
            var results = new List<GetPropertyFilesForViewDto>();

            foreach (var o in dbList)
            {
                var res = new GetPropertyFilesForViewDto()
                {
                    PropertyFiles = new PropertyFilesDto
                    {

                        FileName = o.FileName,
                        ImageBytes=o.ImageBytes,
                        Id = o.Id,
                        
                    },
                    PropertyPropertySpecs = o.PropertyPropertySpecs
                };

                results.Add(res);
            }

            return new PagedResultDto<GetPropertyFilesForViewDto>(
                totalCount,
                results
            );

        }

        [AbpAuthorize(AppPermissions.Pages_PropertyFileses_Edit)]
        public virtual async Task<GetPropertyFilesForEditOutput> GetPropertyFilesForEdit(EntityDto input)
        {
            var propertyFiles = await _propertyFilesRepository.FirstOrDefaultAsync(input.Id);

            var output = new GetPropertyFilesForEditOutput { PropertyFiles = ObjectMapper.Map<CreateOrEditPropertyFilesDto>(propertyFiles) };

            if (output.PropertyFiles.PropertyId != null)
            {
                var _lookupProperty = await _lookup_propertyRepository.FirstOrDefaultAsync((Guid)output.PropertyFiles.PropertyId);
                output.PropertyPropertySpecs = _lookupProperty?.PropertySpecs?.ToString();
            }

            return output;
        }

        public virtual async Task CreateOrEdit(CreateOrEditPropertyFilesDto input)
        {
            if (input.Id == null)
            {
                await Create(input);
            }
            else
            {
                await Update(input);
            }
        }

        [AbpAuthorize(AppPermissions.Pages_PropertyFileses_Create)]
        protected virtual async Task Create(CreateOrEditPropertyFilesDto input)
        {
            var propertyFiles = ObjectMapper.Map<PropertyFiles>(input);

            await _propertyFilesRepository.InsertAsync(propertyFiles);

        }

        [AbpAuthorize(AppPermissions.Pages_PropertyFileses_Edit)]
        protected virtual async Task Update(CreateOrEditPropertyFilesDto input)
        {
            var propertyFiles = await _propertyFilesRepository.FirstOrDefaultAsync((int)input.Id);
            ObjectMapper.Map(input, propertyFiles);

        }

        [AbpAuthorize(AppPermissions.Pages_PropertyFileses_Delete)]
        public virtual async Task Delete(EntityDto input)
        {
            await _propertyFilesRepository.DeleteAsync(input.Id);
        }

        [AbpAuthorize(AppPermissions.Pages_PropertyFileses)]
        public async Task<PagedResultDto<PropertyFilesPropertyLookupTableDto>> GetAllPropertyForLookupTable(GetAllForLookupTableInput input)
        {
            var query = _lookup_propertyRepository.GetAll().WhereIf(
                   !string.IsNullOrWhiteSpace(input.Filter),
                  e => e.PropertySpecs != null && e.PropertySpecs.Contains(input.Filter)
               );

            var totalCount = await query.CountAsync();

            var propertyList = await query
                .PageBy(input)
                .ToListAsync();

            var lookupTableDtoList = new List<PropertyFilesPropertyLookupTableDto>();
            foreach (var property in propertyList)
            {
                lookupTableDtoList.Add(new PropertyFilesPropertyLookupTableDto
                {
                    Id = property.Id.ToString(),
                    DisplayName = property.PropertySpecs?.ToString()
                });
            }

            return new PagedResultDto<PropertyFilesPropertyLookupTableDto>(
                totalCount,
                lookupTableDtoList
            );
        }

    }
}