using Microsoft.EntityFrameworkCore.Migrations;

namespace PayrollManager.Infrastructure.PayrollDbContext.Migrations
{
    public partial class RemovedColumnsFromRemuneration : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "MonthlyBaseSalary",
                table: "Remunerations");

            migrationBuilder.DropColumn(
                name: "OvertimeHrs",
                table: "Remunerations");

            migrationBuilder.DropColumn(
                name: "RetirementBalance",
                table: "Remunerations");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<decimal>(
                name: "MonthlyBaseSalary",
                table: "Remunerations",
                type: "decimal(18,2)",
                nullable: false,
                defaultValue: 0m);

            migrationBuilder.AddColumn<int>(
                name: "OvertimeHrs",
                table: "Remunerations",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<decimal>(
                name: "RetirementBalance",
                table: "Remunerations",
                type: "decimal(18,2)",
                nullable: false,
                defaultValue: 0m);
        }
    }
}
