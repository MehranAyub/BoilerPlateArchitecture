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
    [AbpAuthorize(AppPermissions.Pages_Properties)]
    public class PropertiesAppService : ERPAppServiceBase, IPropertiesAppService
    {
        private readonly IRepository<Property, Guid> _propertyRepository;

        public PropertiesAppService(IRepository<Property, Guid> propertyRepository)
        {
            _propertyRepository = propertyRepository;

        }

        public virtual async Task<PagedResultDto<GetPropertyForViewDto>> GetAll(GetAllPropertiesInput input)
        {

            var filteredProperties = _propertyRepository.GetAll()
                        .WhereIf(!string.IsNullOrWhiteSpace(input.Filter), e => false || e.Address.Contains(input.Filter) || e.PropertySpecs.Contains(input.Filter) || e.Description.Contains(input.Filter) || e.ViewingDescription.Contains(input.Filter) || e.ViewingContact.Contains(input.Filter) || e.OfferContact.Contains(input.Filter))
                        .WhereIf(!string.IsNullOrWhiteSpace(input.AddressFilter), e => e.Address.Contains(input.AddressFilter))
                        .WhereIf(!string.IsNullOrWhiteSpace(input.PropertySpecsFilter), e => e.PropertySpecs.Contains(input.PropertySpecsFilter))
                        .WhereIf(!string.IsNullOrWhiteSpace(input.DescriptionFilter), e => e.Description.Contains(input.DescriptionFilter))
                        .WhereIf(input.MinWholeSalePriceFilter != null, e => e.WholeSalePrice >= input.MinWholeSalePriceFilter)
                        .WhereIf(input.MaxWholeSalePriceFilter != null, e => e.WholeSalePrice <= input.MaxWholeSalePriceFilter)
                        .WhereIf(input.MinEstimatedARVFilter != null, e => e.EstimatedARV >= input.MinEstimatedARVFilter)
                        .WhereIf(input.MaxEstimatedARVFilter != null, e => e.EstimatedARV <= input.MaxEstimatedARVFilter)
                        .WhereIf(input.MinEstimatedRehabFilter != null, e => e.EstimatedRehab >= input.MinEstimatedRehabFilter)
                        .WhereIf(input.MaxEstimatedRehabFilter != null, e => e.EstimatedRehab <= input.MaxEstimatedRehabFilter)
                        .WhereIf(!string.IsNullOrWhiteSpace(input.ViewingDescriptionFilter), e => e.ViewingDescription.Contains(input.ViewingDescriptionFilter))
                        .WhereIf(input.MinEMDRequirementFilter != null, e => e.EMDRequirement >= input.MinEMDRequirementFilter)
                        .WhereIf(input.MaxEMDRequirementFilter != null, e => e.EMDRequirement <= input.MaxEMDRequirementFilter)
                        .WhereIf(!string.IsNullOrWhiteSpace(input.ViewingContactFilter), e => e.ViewingContact.Contains(input.ViewingContactFilter))
                        .WhereIf(!string.IsNullOrWhiteSpace(input.OfferContactFilter), e => e.OfferContact.Contains(input.OfferContactFilter));

            var pagedAndFilteredProperties = filteredProperties
                .OrderBy(input.Sorting ?? "id asc")
                .PageBy(input);

            var properties = from o in pagedAndFilteredProperties
                             select new
                             {

                                 o.Address,
                                 o.PropertySpecs,
                                 o.Description,
                                 o.WholeSalePrice,
                                 o.EstimatedARV,
                                 o.EstimatedRehab,
                                 o.ViewingDescription,
                                 o.EMDRequirement,
                                 o.ViewingContact,
                                 o.OfferContact,
                                 Id = o.Id
                             };

            var totalCount = await filteredProperties.CountAsync();

            var dbList = await properties.ToListAsync();
            var results = new List<GetPropertyForViewDto>();

            foreach (var o in dbList)
            {
                var res = new GetPropertyForViewDto()
                {
                    Property = new PropertyDto
                    {

                        Address = o.Address,
                        PropertySpecs = o.PropertySpecs,
                        Description = o.Description,
                        WholeSalePrice = o.WholeSalePrice,
                        EstimatedARV = o.EstimatedARV,
                        EstimatedRehab = o.EstimatedRehab,
                        ViewingDescription = o.ViewingDescription,
                        EMDRequirement = o.EMDRequirement,
                        ViewingContact = o.ViewingContact,
                        OfferContact = o.OfferContact,
                        Id = o.Id,
                    }
                };

                results.Add(res);
            }

            return new PagedResultDto<GetPropertyForViewDto>(
                totalCount,
                results
            );

        }

        public virtual async Task<GetPropertyForViewDto> GetPropertyForView(Guid id)
        {
            var property = await _propertyRepository.GetAsync(id);

            var output = new GetPropertyForViewDto { Property = ObjectMapper.Map<PropertyDto>(property) };

            return output;
        }

        [AbpAuthorize(AppPermissions.Pages_Properties_Edit)]
        public virtual async Task<GetPropertyForEditOutput> GetPropertyForEdit(EntityDto<Guid> input)
        {
            var property = await _propertyRepository.FirstOrDefaultAsync(input.Id);

            var output = new GetPropertyForEditOutput { Property = ObjectMapper.Map<CreateOrEditPropertyDto>(property) };

            return output;
        }

        public virtual async Task<Guid> CreateOrEdit(CreateOrEditPropertyDto input)
        { 

            if (input.Id == null)
            {
              return  await Create(input);
            }
            else
            {
                return await Update(input);
            }
        }

        [AbpAuthorize(AppPermissions.Pages_Properties_Create)]
        protected virtual async Task<Guid> Create(CreateOrEditPropertyDto input)
        {
            var property = ObjectMapper.Map<Property>(input);

          var Id=  await _propertyRepository.InsertAndGetIdAsync(property);
            return Id;

        }

        [AbpAuthorize(AppPermissions.Pages_Properties_Edit)]
        protected virtual async Task<Guid> Update(CreateOrEditPropertyDto input)
        {
            var property = await _propertyRepository.FirstOrDefaultAsync((Guid)input.Id);
            ObjectMapper.Map(input, property);
            return property.Id;
        }

        [AbpAuthorize(AppPermissions.Pages_Properties_Delete)]
        public virtual async Task Delete(EntityDto<Guid> input)
        {
            await _propertyRepository.DeleteAsync(input.Id);
        }

    }
}