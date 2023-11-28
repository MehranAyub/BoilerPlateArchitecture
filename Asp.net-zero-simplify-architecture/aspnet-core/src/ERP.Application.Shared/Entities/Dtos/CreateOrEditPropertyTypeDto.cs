using System;
using Abp.Application.Services.Dto;
using System.ComponentModel.DataAnnotations;

namespace ERP.Entities.Dtos
{
    public class CreateOrEditPropertyTypeDto : EntityDto<int?>
    {

        public string Name { get; set; }

    }
}