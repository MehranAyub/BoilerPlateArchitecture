using System;
using Abp.Application.Services.Dto;
using System.ComponentModel.DataAnnotations;

namespace ERP.Entities.Dtos
{
    public class GetFlipForEditOutput
    {
		public CreateOrEditFlipDto Flip { get; set; }


    }
}