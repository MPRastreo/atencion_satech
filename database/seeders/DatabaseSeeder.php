<?php

namespace Database\Seeders;

use App\Models\Category;
use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // User::factory(10)->create();

        Category::create
        (
            // * Descomentar de uno por uno

            // [
            //     "name"=> "Comandos",
            //     "slug"=> "commands",
            //     "description"=> "Uso y manejo de comandos en plataforma",
            // ]
            // [
            //     "name"=> "Unidades",
            //     "slug"=> "unidades",
            //     "description"=> "Información sobre unidades"
            // ],
            // [
            //     "name"=> "Informes",
            //     "slug"=> "informes",
            //     "description"=> "Contenido visual sobre la generación de informes"
            // ],
        );
    }
}
