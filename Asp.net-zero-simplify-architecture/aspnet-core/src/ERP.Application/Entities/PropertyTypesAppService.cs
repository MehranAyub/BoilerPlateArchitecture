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
    [AbpAuthorize(AppPermissions.Pages_PropertyTypes)]
    public class PropertyTypesAppService : ERPAppServiceBase, IPropertyTypesAppService
    {
        private readonly IRepository<PropertyType> _propertyTypeRepository;

        public PropertyTypesAppService(IRepository<PropertyType> propertyTypeRepository)
        {
            _propertyTypeRepository = propertyTypeRepository;

        }

        public virtual async Task<PagedResultDto<GetPropertyTypeForViewDto>> GetAll(GetAllPropertyTypesInput input)
        {

            var filteredPropertyTypes = _propertyTypeRepository.GetAll()
                        .WhereIf(!string.IsNullOrWhiteSpace(input.Filter), e => false || e.Name.Contains(input.Filter))
                        .WhereIf(!string.IsNullOrWhiteSpace(input.NameFilter), e => e.Name.Contains(input.NameFilter));

            var pagedAndFilteredPropertyTypes = filteredPropertyTypes
                .OrderBy(input.Sorting ?? "id desc")
                .PageBy(input);

            var propertyTypes = from o in pagedAndFilteredPropertyTypes
                                select new
                                {

                                    o.Name,
                                    Id = o.Id
                                };

            var totalCount = await filteredPropertyTypes.CountAsync();

            var dbList = await propertyTypes.ToListAsync();
            var results = new List<GetPropertyTypeForViewDto>();

            foreach (var o in dbList)
            {
                var res = new GetPropertyTypeForViewDto()
                {
                    PropertyType = new PropertyTypeDto
                    {

                        Name = o.Name,
                        Id = o.Id,
                    }
                };

                results.Add(res);
            }

            return new PagedResultDto<GetPropertyTypeForViewDto>(
                totalCount,
                results
            );

        }

        [AbpAuthorize(AppPermissions.Pages_PropertyTypes_Edit)]
        public virtual async Task<GetPropertyTypeForEditOutput> GetPropertyTypeForEdit(EntityDto input)
        {
            var propertyType = await _propertyTypeRepository.FirstOrDefaultAsync(input.Id);

            var output = new GetPropertyTypeForEditOutput { PropertyType = ObjectMapper.Map<CreateOrEditPropertyTypeDto>(propertyType) };

            return output;
        }

        public virtual async Task CreateOrEdit(CreateOrEditPropertyTypeDto input)
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

        [AbpAuthorize(AppPermissions.Pages_PropertyTypes_Create)]
        protected virtual async Task Create(CreateOrEditPropertyTypeDto input)
        {
            var propertyType = ObjectMapper.Map<PropertyType>(input);

            await _propertyTypeRepository.InsertAsync(propertyType);

        }

        [AbpAuthorize(AppPermissions.Pages_PropertyTypes_Edit)]
        protected virtual async Task Update(CreateOrEditPropertyTypeDto input)
        {
            var propertyType = await _propertyTypeRepository.FirstOrDefaultAsync((int)input.Id);
            ObjectMapper.Map(input, propertyType);

        }

        [AbpAuthorize(AppPermissions.Pages_PropertyTypes_Delete)]
        public virtual async Task Delete(EntityDto input)
        {
            await _propertyTypeRepository.DeleteAsync(input.Id);
        }

    }
}