using ERP.Web.Models;
using Microsoft.AspNetCore.Mvc;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using System;
using Microsoft.AspNetCore.Hosting;
using ERP.Entities;
using ERP.Dto;

namespace ERP.Web.Controllers
{
    public class FileUploadController : ERPControllerBase
    {
        private readonly IHostingEnvironment _env;
        private readonly PropertyFilesesAppService _PropertyFilesesAppService;
        public FileUploadController(IHostingEnvironment env, PropertyFilesesAppService PropertyFilesesAppService)
        {
            _env = env;
            _PropertyFilesesAppService = PropertyFilesesAppService;

        }

        [HttpPost]
        public async Task<bool> UploadFile(FileUploadViewModel model)
        { 

            foreach (var formFile in Request.Form.Files)
            {
                if (formFile.Length > 0)
                {
                    byte[] fileData;
                    using (var ms = new MemoryStream())
                    {
                        await formFile.CopyToAsync(ms);
                        fileData = ms.ToArray();
                    }
                   await _PropertyFilesesAppService.CreateOrEdit(new Entities.Dtos.CreateOrEditPropertyFilesDto { FileName = formFile?.FileName, ImageBytes= fileData,PropertyId=model.PropertyId ,FileType=formFile?.ContentType});

                }
            }
            
            return true;
        }
 
    }
}
