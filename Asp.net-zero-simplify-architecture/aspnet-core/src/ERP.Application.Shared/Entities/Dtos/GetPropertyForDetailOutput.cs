using System;
using Abp.Application.Services.Dto;
using System.ComponentModel.DataAnnotations;
using System.Collections.Generic;

namespace ERP.Entities.Dtos
{
    public class GetPropertyForDetailOutput
    {
        public CreateOrEditPropertyDto Property { get; set; }
        public string PropertyTypeName { get; set; }
        public List<PropertyFilesDto> PropertyFiles { get; set; }


    }
}