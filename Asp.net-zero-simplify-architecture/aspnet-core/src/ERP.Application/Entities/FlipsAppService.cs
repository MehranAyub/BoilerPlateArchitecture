

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
using ERP.Authorization.Roles;
using Abp.Authorization.Users;

namespace ERP.Entities
{
	[AbpAuthorize(AppPermissions.Pages_Flips)]
    public class FlipsAppService : ERPAppServiceBase, IFlipsAppService
    {
		 private readonly IRepository<Flip, Guid> _flipRepository;
		private readonly RoleManager _roleManager;
		private readonly IRepository<UserRole, long> _userRoleRepository;
		public FlipsAppService(IRepository<Flip, Guid> flipRepository, RoleManager roleManager, IRepository<UserRole, long> userRoleRepository) 
		  {
			_flipRepository = flipRepository;
			_roleManager = roleManager;
			_userRoleRepository = userRoleRepository;
		  }

		 public async Task<PagedResultDto<GetFlipForViewDto>> GetAll(GetAllFlipsInput input)
         {
			
			var filteredFlips = _flipRepository.GetAll()
						.WhereIf(!string.IsNullOrWhiteSpace(input.Filter), e => false  || e.Address.Contains(input.Filter))
						.WhereIf(!string.IsNullOrWhiteSpace(input.AddressFilter),  e => e.Address.ToLower() == input.AddressFilter.ToLower().Trim())
						.WhereIf(input.MinDatePurchasedFilter != null, e => e.DatePurchased >= input.MinDatePurchasedFilter)
						.WhereIf(input.MaxDatePurchasedFilter != null, e => e.DatePurchased <= input.MaxDatePurchasedFilter)
						.WhereIf(input.MinPricePurchasedFilter != null, e => e.PricePurchased >= input.MinPricePurchasedFilter)
						.WhereIf(input.MaxPricePurchasedFilter != null, e => e.PricePurchased <= input.MaxPricePurchasedFilter)
						.WhereIf(input.MinAmountRehabFilter != null, e => e.AmountRehab >= input.MinAmountRehabFilter)
						.WhereIf(input.MaxAmountRehabFilter != null, e => e.AmountRehab <= input.MaxAmountRehabFilter)
						.WhereIf(input.MinDateSoldFilter != null, e => e.DateSold >= input.MinDateSoldFilter)
						.WhereIf(input.MaxDateSoldFilter != null, e => e.DateSold <= input.MaxDateSoldFilter)
						.WhereIf(input.MinAmountSoldFilter != null, e => e.AmountSold >= input.MinAmountSoldFilter)
						.WhereIf(input.MaxAmountSoldFilter != null, e => e.AmountSold <= input.MaxAmountSoldFilter);


			var currentSessionRoles = from ur in _userRoleRepository.GetAll()
					   join r in _roleManager.Roles on ur.RoleId equals r.Id into j1
					   from s1 in j1.DefaultIfEmpty()
					   where (ur.UserId == AbpSession.UserId)
					   select s1;
			var isAdminOrWholesaler = currentSessionRoles.FirstOrDefault(x => x.DisplayName == "Admin" || x.DisplayName == "Wholesaler" || x.DisplayName== "Master Wholesaler");
             
            if (isAdminOrWholesaler == null)
            {
                filteredFlips = filteredFlips.Where(x => x.CreatorUserId == AbpSession.UserId);
            }

            var pagedAndFilteredFlips = filteredFlips
                .OrderBy(input.Sorting ?? "id desc")
                .PageBy(input);

			var flips = from o in pagedAndFilteredFlips
						join o1 in UserManager.Users on o.CreatorUserId equals o1.Id into j1
						from s1 in j1.DefaultIfEmpty()
						select new GetFlipForViewDto() {
							Flip = new FlipDto
							{
                                Address = o.Address,
                                DatePurchased = o.DatePurchased,
                                PricePurchased = o.PricePurchased,
                                AmountRehab = o.AmountRehab,
                                DateSold = o.DateSold,
                                AmountSold = o.AmountSold,
                                Id = o.Id,
								CreatedBy= s1.Name,
								CreatedByFlipsCount=pagedAndFilteredFlips.Count(x=>x.CreatorUserId==s1.Id)
							}
						};

            var totalCount = await filteredFlips.CountAsync();

            return new PagedResultDto<GetFlipForViewDto>(
                totalCount,
                await flips.ToListAsync()
            );
         }
		 
		 public async Task<GetFlipForViewDto> GetFlipForView(Guid id)
         {
            var flip = await _flipRepository.GetAsync(id);

            var output = new GetFlipForViewDto { Flip = ObjectMapper.Map<FlipDto>(flip) };
			
            return output;
         }
		 
		 [AbpAuthorize(AppPermissions.Pages_Flips_Edit)]
		 public async Task<GetFlipForEditOutput> GetFlipForEdit(EntityDto<Guid> input)
         {
            var flip = await _flipRepository.FirstOrDefaultAsync(input.Id);
           
		    var output = new GetFlipForEditOutput {Flip = ObjectMapper.Map<CreateOrEditFlipDto>(flip)};
			
            return output;
         }

		 public async Task CreateOrEdit(CreateOrEditFlipDto input)
         {
            if(input.Id == null){
				await Create(input);
			}
			else{
				await Update(input);
			}
         }

		 [AbpAuthorize(AppPermissions.Pages_Flips_Create)]
		 private async Task Create(CreateOrEditFlipDto input)
         {
            var flip = ObjectMapper.Map<Flip>(input);

			

            await _flipRepository.InsertAsync(flip);
         }

		 [AbpAuthorize(AppPermissions.Pages_Flips_Edit)]
		 private async Task Update(CreateOrEditFlipDto input)
         {
            var flip = await _flipRepository.FirstOrDefaultAsync((Guid)input.Id);
             ObjectMapper.Map(input, flip);
         }

		 [AbpAuthorize(AppPermissions.Pages_Flips_Delete)]
         public async Task Delete(EntityDto<Guid> input)
         {
            await _flipRepository.DeleteAsync(input.Id);
         } 
    }
}