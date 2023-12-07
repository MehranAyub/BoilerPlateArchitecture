using System;
using System.Threading.Tasks;
using Abp.Application.Services;
using Abp.Application.Services.Dto;
using ERP.Entities.Dtos;
using ERP.Dto;

namespace ERP.Entities
{
    public interface IFlipsAppService : IApplicationService 
    {
        Task<PagedResultDto<GetFlipForViewDto>> GetAll(GetAllFlipsInput input);

        Task<GetFlipForViewDto> GetFlipForView(Guid id);

		Task<GetFlipForEditOutput> GetFlipForEdit(EntityDto<Guid> input);

		Task CreateOrEdit(CreateOrEditFlipDto input);

		Task Delete(EntityDto<Guid> input);

		
    }
}