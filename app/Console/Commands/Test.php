<?php

namespace App\Console\Commands;

use App\Models\Category;
use App\Models\Content;
use Illuminate\Console\Command;

class Test extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'app:test';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Command description';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        // Content::truncate();
        Content::factory(5)->create();

        // Category::create
        // (
        //     [
        //         "name"=> "Fuel",
        //         "slug"=> "fuel",
        //         "description"=> "Contenido visual acerca del manejo de combustible en la App SATECH",
        //     ]
        // );
    }
}
