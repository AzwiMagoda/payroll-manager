﻿using System;
using System.ComponentModel.DataAnnotations;

namespace PayrollManager.Infrastructure.Models
{
    public interface IEntityBase
    {
        [Key]
        Guid Id { get; set; }
        DateTime CreatedDate { get; set; }
    }
}
