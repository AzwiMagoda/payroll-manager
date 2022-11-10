using AutoMapper;
using PayrollManager.Application.Manager.Dto;
using PayrollManager.Infrastructure.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PayrollManager.Application.Manager.AutoMapper
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            CreateMap<BookedLeaveDaysEntity, BookedLeaveDaysDto>();
        }
    }
}
