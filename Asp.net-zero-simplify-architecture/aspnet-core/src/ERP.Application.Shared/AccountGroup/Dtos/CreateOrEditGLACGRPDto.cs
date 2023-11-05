
using System;
using Abp.Application.Services.Dto;
using System.ComponentModel.DataAnnotations;

namespace ERP.AccountGroup.Dtos
{
    public class CreateOrEditGLACGRPDto : EntityDto<int>
    {

		public string ACCTGRPCOD { get; set; }
		
		
		public DateTime AUDTDATE { get; set; }
		
		
		[Required]
		public TimeSpan AUDTTIME { get; set; }
		
		
		[Required]
		public string AUDTUSER { get; set; }
		
		
		[Required]
		public string AUDTORG { get; set; }
		
		
		[Required]
		public string ACCTGRPDES { get; set; }
		
		
		[Required]
		public string SORTCODE { get; set; }
		
		
		[Required]
		public short GRPCOD { get; set; }
        public int Id { get; set; }
        
    }
    public class GetAllData
    {
        public string ACCTGRPCOD { get; set; }
    }
}