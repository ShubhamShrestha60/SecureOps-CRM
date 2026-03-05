<?php

namespace App\Http\Controllers;

use App\Models\Contact;
use App\Http\Controllers\Controller;
use App\Http\Requests\StoreContactRequest;
use App\Http\Requests\UpdateContactRequest;
use App\Http\Resources\ContactResource;
use App\Traits\ApiResponse;
use Illuminate\Http\Request;

class ContactController extends Controller
{
    use ApiResponse;

    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $contacts = Contact::latest()->get();
        return $this->successResponse(
            ContactResource::collection($contacts),
            'Contacts retrieved successfully'
        );
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreContactRequest $request)
    {
        $contact = Contact::create($request->validated());

        return $this->successResponse(
            new ContactResource($contact),
            'Contact created successfully',
            201
        );
    }

    /**
     * Display the specified resource.
     */
    public function show(Contact $contact)
    {
        return $this->successResponse(
            new ContactResource($contact),
            'Contact details retrieved'
        );
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateContactRequest $request, Contact $contact)
    {
        $contact->update($request->validated());

        return $this->successResponse(
            new ContactResource($contact),
            'Contact updated successfully'
        );
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Contact $contact)
    {
        $contact->delete();

        return $this->successResponse(
            null,
            'Contact deleted successfully',
            200
        );
    }
}
