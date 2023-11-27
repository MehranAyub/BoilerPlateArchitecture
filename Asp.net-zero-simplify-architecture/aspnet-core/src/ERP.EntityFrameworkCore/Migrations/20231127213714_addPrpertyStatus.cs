using Microsoft.EntityFrameworkCore.Migrations;

namespace ERP.Migrations
{
    public partial class addPrpertyStatus : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<long>(
                name: "WholeSalePrice",
                table: "Properties",
                nullable: true,
                oldClrType: typeof(long));

            migrationBuilder.AlterColumn<long>(
                name: "EMDRequirement",
                table: "Properties",
                nullable: true,
                oldClrType: typeof(long));

            migrationBuilder.AddColumn<bool>(
                name: "IsFeatured",
                table: "Properties",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<int>(
                name: "PropertyStatus",
                table: "Properties",
                nullable: false,
                defaultValue: 0);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "IsFeatured",
                table: "Properties");

            migrationBuilder.DropColumn(
                name: "PropertyStatus",
                table: "Properties");

            migrationBuilder.AlterColumn<long>(
                name: "WholeSalePrice",
                table: "Properties",
                nullable: false,
                oldClrType: typeof(long),
                oldNullable: true);

            migrationBuilder.AlterColumn<long>(
                name: "EMDRequirement",
                table: "Properties",
                nullable: false,
                oldClrType: typeof(long),
                oldNullable: true);
        }
    }
}
