using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace PayrollManager.Infrastructure.PayrollDbContext.Migrations
{
    public partial class UpdatedEmployeeModel : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "EmployeeNumber",
                table: "Employees",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "EmployeeType",
                table: "Employees",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<DateTime>(
                name: "HireDate",
                table: "Employees",
                type: "datetime2",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AddColumn<string>(
                name: "JobType",
                table: "Employees",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Location",
                table: "Employees",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "ManagerEmployeeId",
                table: "Employees",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<DateTime>(
                name: "OriginalHireDate",
                table: "Employees",
                type: "datetime2",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AddColumn<Guid>(
                name: "TeamId",
                table: "Employees",
                type: "uniqueidentifier",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"));

            migrationBuilder.AddColumn<string>(
                name: "WorkAddress",
                table: "ContactDetails",
                type: "nvarchar(max)",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "EmployeeNumber",
                table: "Employees");

            migrationBuilder.DropColumn(
                name: "EmployeeType",
                table: "Employees");

            migrationBuilder.DropColumn(
                name: "HireDate",
                table: "Employees");

            migrationBuilder.DropColumn(
                name: "JobType",
                table: "Employees");

            migrationBuilder.DropColumn(
                name: "Location",
                table: "Employees");

            migrationBuilder.DropColumn(
                name: "ManagerEmployeeId",
                table: "Employees");

            migrationBuilder.DropColumn(
                name: "OriginalHireDate",
                table: "Employees");

            migrationBuilder.DropColumn(
                name: "TeamId",
                table: "Employees");

            migrationBuilder.DropColumn(
                name: "WorkAddress",
                table: "ContactDetails");
        }
    }
}
