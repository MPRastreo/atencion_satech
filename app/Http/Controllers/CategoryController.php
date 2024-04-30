<?php

namespace App\Http\Controllers;

use App\Models\Category;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Validation\ValidationException;
use Inertia\Inertia;
use Illuminate\Http\Response as HttpResponse;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Str;

class CategoryController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        try 
        {
            $categories = Category::all();
            return Inertia::render('Category/Index', ['categories' => $categories]);
        } 
        catch (Exception $ex) 
        {
            abort(Response::HTTP_INTERNAL_SERVER_ERROR, 'Error de servidor');
        }
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        try 
        {
            $request->validate
            (
                [
                    'name' => 'required|string|unique:contents|min:3',
                    'description' => 'required|string|min:10',
                ]
            );

            $category = new Category();
            $category->name = $request->name;
            $category->description = $request->description;
            $category->slug = Str::lower(str_replace('/[^a-z]+/i','-', $request->name));
            $category->save();

            return response()->json(['message' => 'Categoría creada exitosamente, presiona aceptar para visualizar los cambios'], HttpResponse::HTTP_OK);
        } 
        catch (ValidationException $vex)
        {
            return response()->json($vex->errors(), HttpResponse::HTTP_UNPROCESSABLE_ENTITY);
        }
        catch (Exception $ex) 
        {
            Log::error($ex->getMessage());
            return response()->json(["error" => "Error de servidor, intente de nuevo más tarde"], HttpResponse::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(Category $category)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Category $category)
    {
        try 
        {
            $category = Category::find($category->id);

            if (!isset($category))
                return redirect()->route('categories.index');

            return Inertia::render('Category/Partials/UpdateCategories', ['category' => $category]);
        } 
        catch (Exception $ex) 
        {
            abort(Response::HTTP_INTERNAL_SERVER_ERROR, 'Error de servidor');
        }
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Category $category)
    {
        try 
        {
            $request->validate
            (
                [
                    'name' => 'required|string|min:3',
                    'description' => 'required|string|min:10',
                ]
            );

            $category = Category::find($category->id);

            if(!isset($category))
                return response()->json(['message' => 'El registro se eliminó o ha cambiado'], HttpResponse::HTTP_NOT_FOUND);

            $category->name = $request->name;
            $category->description = $request->description;
            $category->slug = Str::lower(str_replace('/[^a-z]+/i','-', $request->name));
            $category->save();

            return response()->json(['message' => 'Categoría actualizada exitosamente, presiona aceptar para visualizar los cambios'], HttpResponse::HTTP_OK);
        } 
        catch (ValidationException $vex)
        {
            return response()->json($vex->errors(), HttpResponse::HTTP_UNPROCESSABLE_ENTITY);
        }
        catch (Exception $ex) 
        {
            Log::error($ex->getMessage());
            return response()->json(["error" => "Error de servidor, intente de nuevo más tarde"], HttpResponse::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Category $category)
    {
        try 
        {
            $category->delete();  
            return response()->json(['message' => 'Categoría eliminada exitosamente, presiona aceptar para visualizar los cambios'], HttpResponse::HTTP_OK);
        }
        catch (Exception $ex) 
        {
            Log::error($ex->getMessage());
            return response()->json(["error" => "Error de servidor, intente de nuevo más tarde"], HttpResponse::HTTP_INTERNAL_SERVER_ERROR);
        }   
    }
}
