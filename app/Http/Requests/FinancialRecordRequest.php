<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class FinancialRecordRequest extends FormRequest
{
    public function rules()
    {
        return [
            'id_type' => 'required|integer',
            'id_category' => 'required|integer',
            'id_process' => 'nullable',
            'id_status' => 'required|integer',
            'value' => 'required|numeric|max:999999999',
            'description' => 'required|string|max:255',
        ];
    }

    public function messages()
    {
        return  [
            'id_type.required' => 'O campo tipo é obrigatório.',
            'id_category.required' => 'O campo categoria é obrigatório.',
            'id_status.required' => 'O campo status é obrigatório.',
            'value.required' => 'O campo valor é obrigatório.',
            'value.numeric' => 'O campo valor deve ser um número.',
            'value.max' => 'O campo valor não pode exceder 9 caracteres.',
            'description.required' => 'O campo descrição é obrigatório.',
            'description.string' => 'O campo descrição deve ser uma string.',
            'description.max' => 'O campo descrição não pode exceder 255 caracteres.',
        ];
    }
}
