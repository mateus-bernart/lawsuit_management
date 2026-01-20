<?php

namespace App\Http\Controllers;

use App\Http\Requests\FinancialRecordRequest;
use App\Models\Category;
use App\Models\FinancialRecord;
use App\Models\Process;
use App\Models\FinancialRecordStatus;
use App\Models\FinancialRecordType;
use App\Services\FinancialRecordService;
use Illuminate\Http\Request;

class FinancialRecordController extends Controller
{
    public function index()
    {
        $financialRecords =
            FinancialRecord::with("statuses")
            ->with("category")
            ->with("type")
            ->with("process")
            ->get();

        $statuses = FinancialRecordStatus::all();

        return inertia('FinancialRecord/Index')->with([
            'financialRecords' => $financialRecords,
            'statuses' => $statuses,
        ]);
    }

    public function create()
    {
        $financialRecords =
            FinancialRecord::with("statuses")
            ->with("category")
            ->with("type")
            ->get();

        $statuses = FinancialRecordStatus::all();
        $categories = Category::all();
        $types = FinancialRecordType::all();
        $processes = Process::all();

        return inertia('FinancialRecord/Create')->with([
            'financialRecords' => $financialRecords,
            'statuses' => $statuses,
            'categories' => $categories,
            'types' => $types,
            'processes' => $processes
        ]);
    }

    public function store(FinancialRecordRequest $request, FinancialRecordService $service)
    {
        $service->save($request->validated());
        return redirect()->route('financial-record.index')
            ->with('success', 'Registro salvo com sucesso.');
    }

    public function update(FinancialRecordRequest $request, FinancialRecordService $service, FinancialRecord $financialRecord)
    {
        $service->save($request->validated(), $financialRecord);
        return redirect()->route('financial-record.index')->with('success', 'FinancialRecordo atualizado com sucesso.');
    }

    public function edit(FinancialRecord $financialRecord)
    {
        $statuses = FinancialRecordStatus::all();
        return inertia('FinancialRecord/Create')->with([
            'financialRecord' => $financialRecord,
            'number' => $financialRecord->number,
            'description' => $financialRecord->description,
            'id_status' => $financialRecord->id_status,
        ])->with('statuses', $statuses);
    }

    public function destroy(FinancialRecord $financialRecord)
    {
        $financialRecord->delete();
        return redirect()->route('financial-record.index')->with('success', "FinancialRecordo removido com sucesso!");
    }

    public function toggleActive(FinancialRecord $financialRecord)
    {
        $financialRecord->active === 1 ? $financialRecord->active = 0 : $financialRecord->active = 1;
        $financialRecord->save();
        return back()->with("success", "FinancialRecordo atualizado com sucesso!");
    }

    public function toggleStatus(FinancialRecord $financialRecord, Request $request)
    {
        $request->validate([
            'id_status' => 'required|exists:statuses,id',
        ]);

        $financialRecord->id_status = $request->id_status;
        $financialRecord->save();

        return back()->with("success", "FinancialRecordStatus do processo atualizado!");
    }

    public function changeStatus(FinancialRecord $financialRecord, $status)
    {
        $financialRecord->status = $status;
        $financialRecord->save();

        $message = '';
        switch ($status) {
            case '2':
                $message = "em preparação";
                break;
            case '3':
                $message = "pronto para entrega";
                break;
            case '4':
                $message = "entregue";
                break;
            default:
                break;
        }

        return redirect()->route('financial-record.index')->with('success', "Registro marcado como {$message}!");
    }
}
