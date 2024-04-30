<?php

namespace App\Http\Controllers;

use App\Models\Feedback;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Http\Response as HttpResponse;
use Illuminate\Support\Facades\Log;
use Illuminate\Validation\ValidationException;
use Inertia\Inertia;

class FeedbackController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        try 
        {
            $records = Feedback::all();
            return Inertia::render('Feedback/Index', ['records' => $records]);
        } 
        catch (Exception $ex) 
        {
            abort(HttpResponse::HTTP_INTERNAL_SERVER_ERROR, 'Error de servidor');
        }
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        
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
                    'full_name' => 'required|string|min:5',
                    'email' => 'required|email:rfc,dns',
                    'phone_number' => 'required|regex:/(01)[0-9]{9}/',
                    'message' => 'required|string|min:20'
                ]
            );

            Feedback::create
            ([
                'full_name' => $request->full_name,
                'email'=> $request->email,
                'phone_number' => $request->phone_number,
                'message' => $request->message
            ]);

            return response()->json(['message' => 'Registro guardado con exito, pronto nos pondremos en contacto'], HttpResponse::HTTP_OK);
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
    public function show(Feedback $feedback)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Feedback $feedback)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Feedback $feedback)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Feedback $feedback)
    {
        try 
        {
            $feedback->delete();  
            return response()->json(['message' => 'Registro eliminado exitosamente, presiona aceptar para visualizar los cambios'], HttpResponse::HTTP_OK);
        }
        catch (Exception $ex) 
        {
            Log::error($ex->getMessage());
            return response()->json(["error" => "Error de servidor, intente de nuevo más tarde"], HttpResponse::HTTP_INTERNAL_SERVER_ERROR);
        }
    }
}
