using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Abp.Domain.Entities.Auditing;
using Abp.Domain.Entities;

namespace ERP.Entities
{
    [Table("PropertyTypes")]
    public class PropertyType : Entity
    {

        public virtual string Name { get; set; }

    }
}