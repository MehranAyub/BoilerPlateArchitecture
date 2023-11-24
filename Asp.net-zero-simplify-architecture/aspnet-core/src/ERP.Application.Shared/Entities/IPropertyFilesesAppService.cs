using System;
using System.Threading.Tasks;
using Abp.Application.Services;
using Abp.Application.Services.Dto;
using ERP.Entities.Dtos;
using ERP.Dto;

namespace ERP.Entities
{
    public interface IPropertyFilesesAppService : IApplicationService
    {
        Task<PagedResultDto<GetPropertyFilesForViewDto>> GetAll(GetAllPropertyFilesesInput input);

        Task<GetPropertyFilesForEditOutput> GetPropertyFilesForEdit(EntityDto input);

        Task CreateOrEdit(CreateOrEditPropertyFilesDto input);

        Task Delete(EntityDto input);

    }
}