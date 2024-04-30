<?php

namespace Database\Seeders;

use App\Models\Category;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class CategorySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Category::create
        (
            [
                "name"=> "Comandos",
                "slug"=> "comandos",
                "description"=> "Uso y manejo de comandos en plataforma",
            ]
        );

        Category::create
        (
            [
                "name"=> "Unidades",
                "slug"=> "unidades",
                "description"=> "Información sobre unidades"
            ]
        );

        Category::create
        (
            [
                "name"=> "Informes",
                "slug"=> "informes",
                "description"=> "Contenido visual sobre la generación de informes"
            ]
        );
    }
}
