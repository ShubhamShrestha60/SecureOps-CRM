<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreContactRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'name' => 'required|string|max:255',
            'email' => 'nullable|email|max:255|unique:contacts,email',
            'phone' => 'nullable|string|max:20',
            'company' => 'nullable|string|max:255',
            'status' => 'nullable|string|in:lead,customer,inactive',
        ];
    }

    /**
     * Custom messages for validation errors.
     */
    public function messages(): array
    {
        return [
            'name.required' => 'A contact name is absolutely essential.',
            'email.unique' => 'This email is already associated with another contact.',
            'status.in' => 'Please select a valid status: lead, customer, or inactive.',
        ];
    }
}
