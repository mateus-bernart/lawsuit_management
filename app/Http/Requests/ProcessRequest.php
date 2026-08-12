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
      'id_type' => 'required',
      'initial_cause_value' => 'required|numeric|max:999999999',
      'final_cause_value' => 'nullable|numeric|max:999999999',
      'initial_fee_value' => 'required|numeric|max:999999999',
      'final_fee_value' => 'nullable|numeric|max:999999999',
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
      'id_status.required' => 'O campo status é obrigatório.',
      'id_type.required' => 'O campo tipo é obrigatório.',
      'initial_cause_value.required' => 'O campo valor da causa inicial é obrigatório',
      'initial_fee_value.required' => 'O campo valor dos honorários inicial é obrigatório.',
      'initial_cause_value.number' => 'O campo valor da causa inicial deve ser um numero',
      'initial_fee_value.number' => 'O campo valor dos honorarios inicial deve ser um numero',
      'final_cause_value.number' => 'O campo valor da causa final deve ser um numero',
      'final_fee_value.number' => 'O campo valor dos honorarios inicial deve ser um numero',
      'initial_cause_value.max' => 'O campo nao deve exceder 255 caracteres.',
      'initial_fee_value.max' => 'O campo nao deve exceder 255 caracteres.',
      'final_cause_value.max' => 'O campo nao deve exceder 255 caracteres.',
      'final_fee_value.max' => 'O campo nao deve exceder 255 caracteres.',
    ];
  }
}
