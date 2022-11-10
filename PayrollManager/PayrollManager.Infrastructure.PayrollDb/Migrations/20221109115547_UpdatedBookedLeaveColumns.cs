using Microsoft.EntityFrameworkCore.Migrations;

namespace PayrollManager.Infrastructure.PayrollDbContext.Migrations
{
    public partial class UpdatedBookedLeaveColumns : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Reason",
                table: "BookedLeaveDays",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Status",
                table: "BookedLeaveDays",
                type: "nvarchar(max)",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Reason",
                table: "BookedLeaveDays");

            migrationBuilder.DropColumn(
                name: "Status",
                table: "BookedLeaveDays");
        }
    }
}
