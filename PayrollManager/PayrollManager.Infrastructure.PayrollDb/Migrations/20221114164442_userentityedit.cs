using Microsoft.EntityFrameworkCore.Migrations;

namespace PayrollManager.Infrastructure.PayrollDbContext.Migrations
{
    public partial class userentityedit : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "DeactivationDate",
                table: "AspNetUsers",
                newName: "StatusUpdateDate");

            migrationBuilder.RenameColumn(
                name: "ActivationDate",
                table: "AspNetUsers",
                newName: "LastLogin");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "StatusUpdateDate",
                table: "AspNetUsers",
                newName: "DeactivationDate");

            migrationBuilder.RenameColumn(
                name: "LastLogin",
                table: "AspNetUsers",
                newName: "ActivationDate");
        }
    }
}
