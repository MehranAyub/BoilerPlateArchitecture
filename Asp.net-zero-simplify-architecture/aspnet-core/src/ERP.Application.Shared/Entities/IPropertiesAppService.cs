using System;
using System.Threading.Tasks;
using Abp.Application.Services;
using Abp.Application.Services.Dto;
using ERP.Entities.Dtos;
using ERP.Dto;
using System.Collections.Generic;

namespace ERP.Entities
{
    public interface IPropertiesAppService : IApplicationService
    {
        Task<PagedResultDto<GetPropertyForViewDto>> GetAll(GetAllPropertiesInput input);

        Task<GetPropertyForViewDto> GetPropertyForView(Guid id);

        Task<GetPropertyForEditOutput> GetPropertyForEdit(EntityDto<Guid> input);

        Task<Guid> CreateOrEdit(CreateOrEditPropertyDto input);

        Task Delete(EntityDto<Guid> input);
        Task<PagedResultDto<GetPropertyWithImageForViewDto>> GetAllPropertiesWithImages(GetAllPropertiesWithImagesInput input);
        Task<GetPropertyForDetailOutput> GetPropertyForDetail(EntityDto<Guid> input);
        Task<List<PropertyPropertyTypeLookupTableDto>> GetAllPropertyTypeForTableDropdown();
    }
}