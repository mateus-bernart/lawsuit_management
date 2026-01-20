<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class ProcessRequest extends FormRequest
{
    public function rules()
    {
        return [
            'number' => 'required|string|max:255',
            'description' => 'required|string|max:255',
            'id_status' => 'required',
        ];
    }

    public function messages()
    {
        return  [
            'number.required' => 'O campo número é obrigatório.',
            'number.string' => 'O campo número deve ser uma string.',
            'number.max' => 'O campo número não pode exceder 255 caracteres.',
            'description.required' => 'O campo descrição é obrigatório.',
            'description.string' => 'O campo descrição deve ser uma string.',
            'description.max' => 'O campo descrição não pode exceder 255 caracteres.',
            'id_status.required' => 'O campo status é obrigatório.'
        ];
    }
}
