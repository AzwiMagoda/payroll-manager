using AutoMapper;
using PayrollManager.Application.Employee.Dto;
using PayrollManager.Infrastructure.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PayrollManager.Application.Employee.AutoMapper
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            CreateMap<EmployeeEntity, EmployeeDto>();
            CreateMap<RemunerationEntity, RemunerationDto>();
        }
    }
}
