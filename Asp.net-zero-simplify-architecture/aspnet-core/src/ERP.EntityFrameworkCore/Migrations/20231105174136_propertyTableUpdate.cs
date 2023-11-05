using Microsoft.EntityFrameworkCore.Migrations;

namespace ERP.Migrations
{
    public partial class propertyTableUpdate : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<long>(
                name: "WholeSalePrice",
                table: "Properties",
                nullable: false,
                oldClrType: typeof(int));

            migrationBuilder.AlterColumn<long>(
                name: "EstimatedRehab",
                table: "Properties",
                nullable: true,
                oldClrType: typeof(int),
                oldNullable: true);

            migrationBuilder.AlterColumn<long>(
                name: "EstimatedARV",
                table: "Properties",
                nullable: true,
                oldClrType: typeof(int),
                oldNullable: true);

            migrationBuilder.AlterColumn<long>(
                name: "EMDRequirement",
                table: "Properties",
                nullable: false,
                oldClrType: typeof(int));
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<int>(
                name: "WholeSalePrice",
                table: "Properties",
                nullable: false,
                oldClrType: typeof(long));

            migrationBuilder.AlterColumn<int>(
                name: "EstimatedRehab",
                table: "Properties",
                nullable: true,
                oldClrType: typeof(long),
                oldNullable: true);

            migrationBuilder.AlterColumn<int>(
                name: "EstimatedARV",
                table: "Properties",
                nullable: true,
                oldClrType: typeof(long),
                oldNullable: true);

            migrationBuilder.AlterColumn<int>(
                name: "EMDRequirement",
                table: "Properties",
                nullable: false,
                oldClrType: typeof(long));
        }
    }
}
