﻿using System;
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
using static ERP.Entities.Dtos.Enums;
using ERP.Authorization.Roles;
using Abp.Authorization.Users;

namespace ERP.Entities
{ 
    public class PropertiesAppService : ERPAppServiceBase, IPropertiesAppService
    {
        private readonly IRepository<Property, Guid> _propertyRepository;
        private readonly IRepository<PropertyFiles> _propertyFilesRepository;
        private readonly IRepository<PropertyType, int> _lookup_propertyTypeRepository;
        private readonly RoleManager _roleManager;
        private readonly IRepository<UserRole, long> _userRoleRepository;
        public PropertiesAppService(IRepository<Property, Guid> propertyRepository, IRepository<PropertyFiles> propertyFilesRepository, IRepository<PropertyType, int> lookup_propertyTypeRepository,
            RoleManager roleManager, IRepository<UserRole, long> userRoleRepository)
        {
            _propertyRepository = propertyRepository;
            _propertyFilesRepository = propertyFilesRepository;
            _lookup_propertyTypeRepository = lookup_propertyTypeRepository;
            _roleManager = roleManager;
            _userRoleRepository = userRoleRepository;
        }

        public virtual async Task<PagedResultDto<GetPropertyForViewDto>> GetAll(GetAllPropertiesInput input)
        { 
                var filteredProperties = _propertyRepository.GetAll().Include(x=>x.PropertyTypeFk)
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
                        .WhereIf(!string.IsNullOrWhiteSpace(input.OfferContactFilter), e => e.OfferContact.Contains(input.OfferContactFilter))
                        .WhereIf(!string.IsNullOrWhiteSpace(input.PropertyTypeNameFilter), e => e.PropertyTypeFk != null && e.PropertyTypeFk.Name == input.PropertyTypeNameFilter);

            var currentSessionRoles = from ur in _userRoleRepository.GetAll()
                                      join r in _roleManager.Roles on ur.RoleId equals r.Id into j1
                                      from s1 in j1.DefaultIfEmpty()
                                      where (ur.UserId == AbpSession.UserId)
                                      select s1;
            var isAdminOrFlipper = currentSessionRoles.FirstOrDefault(x => x.DisplayName == "Admin" || x.DisplayName == "Flipper");


            if (isAdminOrFlipper==null)
            {
                filteredProperties = filteredProperties.Where(x => x.CreatorUserId == AbpSession.UserId);
            }
            var pagedAndFilteredProperties = filteredProperties
                .OrderBy(input.Sorting ?? "id desc")
                .PageBy(input);
             

            var properties = from o in pagedAndFilteredProperties
                             join o1 in _lookup_propertyTypeRepository.GetAll() on o.PropertyTypeId equals o1.Id into j1
                             from s1 in j1.DefaultIfEmpty()
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
                                 o.PropertyStatus,
                                 o.IsFeatured,
                                 Id = o.Id, 
                                 PropertyTypeName = s1 == null || s1.Name == null ? "" : s1.Name.ToString()
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
                        PropertyStatus=(PropertyStatusDto)o.PropertyStatus,
                        IsFeatured=o.IsFeatured,
                        Id = o.Id,
                    },
                    PropertyTypeName = o.PropertyTypeName
                };

                results.Add(res);
            }

            return new PagedResultDto<GetPropertyForViewDto>(
                totalCount,
                results
            );

        }


        public virtual async Task<PagedResultDto<GetPropertyWithImageForViewDto>> GetAllPropertiesWithImages(GetAllPropertiesWithImagesInput input)
        {
            var filteredProperties= _propertyRepository.GetAll();
            if (input.IsFeatured)
            {
                 filteredProperties = _propertyRepository.GetAll().Where(x=>x.IsFeatured==true).Include(x => x.PropertyFiles).Include(x=>x.PropertyTypeFk);
            }
            else
            {
                 filteredProperties = _propertyRepository.GetAll().Where(x=>x.IsFeatured==false && x.PropertyStatus==(PropertyStatus)input.PropertyStatus).Include(x => x.PropertyFiles).Include(x => x.PropertyTypeFk);
            }

            var pagedAndFilteredProperties = filteredProperties
                .OrderBy(input.Sorting ?? "id asc")
                .PageBy(input);

            var properties = from o in pagedAndFilteredProperties
                             select new
                             {
                                 PropertyData=o,
                                 ImageData=o.PropertyFiles.FirstOrDefault()
                             };

            var totalCount = await filteredProperties.CountAsync();

            var dbList = await properties.ToListAsync();

            var results = new List<GetPropertyWithImageForViewDto>();

            foreach (var o in dbList)
            {
                var res = new GetPropertyWithImageForViewDto()
                {
                    Property = new PropertyDto
                    {

                        Address = o?.PropertyData?.Address,
                        PropertySpecs = o?.PropertyData?.PropertySpecs,
                        Description = o?.PropertyData?.Description,
                        WholeSalePrice = o?.PropertyData?.WholeSalePrice,
                        EstimatedARV = o?.PropertyData?.EstimatedARV,
                        EstimatedRehab = o?.PropertyData?.EstimatedRehab,
                        ViewingDescription = o?.PropertyData?.ViewingDescription,
                        EMDRequirement = o?.PropertyData?.EMDRequirement,
                        ViewingContact = o?.PropertyData?.ViewingContact,
                        OfferContact = o?.PropertyData?.OfferContact,
                        PropertyStatus = (PropertyStatusDto)o?.PropertyData?.PropertyStatus,
                        IsFeatured = (Boolean)o?.PropertyData?.IsFeatured,
                        Id = o.PropertyData.Id,
                        PropertyTypeName=o?.PropertyData?.PropertyTypeFk?.Name
                    },
                    ImageDto=new PropertyFilesDto
                    {
                        ImageBytes=o?.ImageData?.ImageBytes
                    }
                };

                results.Add(res);
            }

            return new PagedResultDto<GetPropertyWithImageForViewDto>(
                totalCount,
                results
            );

        }
         
        public virtual async Task<GetPropertyForDetailOutput> GetPropertyForDetail(EntityDto<Guid> input)
        {
            var property = await _propertyRepository.FirstOrDefaultAsync(input.Id);
            var propertyFiles=await _propertyFilesRepository.GetAll().Where(x=>x.PropertyId== input.Id).ToListAsync();
            var output = new GetPropertyForDetailOutput { Property = ObjectMapper.Map<CreateOrEditPropertyDto>(property),PropertyFiles= ObjectMapper.Map<List<PropertyFilesDto>>(propertyFiles )};
            if (output.Property.PropertyTypeId != null)
            {
                var _lookupPropertyType = await _lookup_propertyTypeRepository.FirstOrDefaultAsync((int)output.Property.PropertyTypeId);
                output.PropertyTypeName = _lookupPropertyType?.Name?.ToString();
            }
            return output;
        }
        public virtual async Task<GetPropertyForViewDto> GetPropertyForView(Guid id)
        {
            var property = await _propertyRepository.GetAsync(id);

            var output = new GetPropertyForViewDto { Property = ObjectMapper.Map<PropertyDto>(property) };

            if (output.Property.PropertyTypeId != null)
            {
                var _lookupPropertyType = await _lookup_propertyTypeRepository.FirstOrDefaultAsync((int)output.Property.PropertyTypeId);
                output.PropertyTypeName = _lookupPropertyType?.Name?.ToString();
            }

            return output;
        }



        [AbpAuthorize(AppPermissions.Pages_Properties_Edit)] 
        public virtual async Task<GetPropertyForEditOutput> GetPropertyForEdit(EntityDto<Guid> input)
        {
            var property = await _propertyRepository.FirstOrDefaultAsync(input.Id);

            var output = new GetPropertyForEditOutput { Property = ObjectMapper.Map<CreateOrEditPropertyDto>(property) };

            if (output.Property.PropertyTypeId != null)
            {
                var _lookupPropertyType = await _lookup_propertyTypeRepository.FirstOrDefaultAsync((int)output.Property.PropertyTypeId);
                output.PropertyTypeName = _lookupPropertyType?.Name?.ToString();
            }

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

        public async Task<List<PropertyPropertyTypeLookupTableDto>> GetAllPropertyTypeForTableDropdown()
        {
            return await _lookup_propertyTypeRepository.GetAll()
                .Select(propertyType => new PropertyPropertyTypeLookupTableDto
                {
                    Id = propertyType.Id,
                    DisplayName = propertyType == null || propertyType.Name == null ? "" : propertyType.Name.ToString()
                }).ToListAsync();
        }

    }
}