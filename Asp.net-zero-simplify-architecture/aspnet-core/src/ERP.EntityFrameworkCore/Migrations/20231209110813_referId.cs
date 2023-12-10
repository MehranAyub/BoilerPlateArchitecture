using Microsoft.EntityFrameworkCore.Migrations;

namespace ERP.Migrations
{
    public partial class referId : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "ReferId",
                table: "AbpUsers",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "ReferId",
                table: "AbpUsers");
        }
    }
}
