using System;
using System.Threading.Tasks;
using Abp.Application.Services;
using Abp.Application.Services.Dto;
using ERP.Entities.Dtos;
using ERP.Dto;

namespace ERP.Entities
{
    public interface IPropertyTypesAppService : IApplicationService
    {
        Task<PagedResultDto<GetPropertyTypeForViewDto>> GetAll(GetAllPropertyTypesInput input);

        Task<GetPropertyTypeForEditOutput> GetPropertyTypeForEdit(EntityDto input);

        Task CreateOrEdit(CreateOrEditPropertyTypeDto input);

        Task Delete(EntityDto input);

    }
}