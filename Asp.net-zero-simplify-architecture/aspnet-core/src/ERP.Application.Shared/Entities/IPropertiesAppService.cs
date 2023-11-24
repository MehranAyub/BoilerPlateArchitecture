using System;
using System.Threading.Tasks;
using Abp.Application.Services;
using Abp.Application.Services.Dto;
using ERP.Entities.Dtos;
using ERP.Dto;

namespace ERP.Entities
{
    public interface IPropertiesAppService : IApplicationService
    {
        Task<PagedResultDto<GetPropertyForViewDto>> GetAll(GetAllPropertiesInput input);

        Task<GetPropertyForViewDto> GetPropertyForView(Guid id);

        Task<GetPropertyForEditOutput> GetPropertyForEdit(EntityDto<Guid> input);

        Task<Guid> CreateOrEdit(CreateOrEditPropertyDto input);

        Task Delete(EntityDto<Guid> input);

    }
}