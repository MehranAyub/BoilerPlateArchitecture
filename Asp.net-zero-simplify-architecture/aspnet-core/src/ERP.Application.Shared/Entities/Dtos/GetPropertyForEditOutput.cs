using System;
using Abp.Application.Services.Dto;
using System.ComponentModel.DataAnnotations;

namespace ERP.Entities.Dtos
{
    public class GetPropertyForEditOutput
    {
        public CreateOrEditPropertyDto Property { get; set; }

        public string PropertyTypeName { get; set; }

    }
}