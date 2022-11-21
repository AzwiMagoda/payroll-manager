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
            CreateMap<EmployeeEntity, EmployeeDto>()
                .ForAllMembers(opts => opts.Condition((src, dest, srcMember) => srcMember != null));

            CreateMap<EmployeeDto, EmployeeEntity>()
                .ForMember(d => d.EmployeeId, opt => opt.PreCondition((src, dest) => src.EmployeeId != Guid.Empty))
                .ForMember(d => d.CreatedDate, opt => opt.PreCondition((src, dest) => src.CreatedDate != DateTime.MinValue))
                .ForAllMembers(opts => opts.Condition((src, dest, srcMember) => srcMember != null));

            CreateMap<ContactDetailsEntity, ContactDetailsDto>().ForAllMembers(opts => opts.Condition((src, dest, srcMember) => srcMember != null));
            CreateMap<ContactDetailsDto, ContactDetailsEntity>()
                .ForMember(d => d.EmployeeId, opt => opt.PreCondition((src, dest) => src.EmployeeId != Guid.Empty))
                .ForAllMembers(opts => opts.Condition((src, dest, srcMember) => srcMember != null));
            
            CreateMap<RemunerationEntity, RemunerationDto>();
        }
    }
}
