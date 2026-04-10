<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\LeaveRequest;
use Illuminate\Http\Request;

class LeaveRequestController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $ds_don_nghi_phep = LeaveRequest::query();

        $ds_don_da_duyet = LeaveRequest::where('status', '!=', null)->get();
        $ds_don_dong_y = LeaveRequest::where('status', '1');
        $ds_don_tu_choi = LeaveRequest::where('status', '0');
        $ds_don_cho_duyet = LeaveRequest::where('status', null)->get();


        return response()->json([
            'ds_don_cho_duyet' => $ds_don_cho_duyet,
            'ds_don_da_duyet' => $ds_don_da_duyet,
            'tong_don' => $ds_don_nghi_phep->count(),
            'so_don_dong_y' => $ds_don_dong_y->count(),
            'so_don_tu_choi' => $ds_don_tu_choi->count(),
            'so_don_cho_duyet' => $ds_don_cho_duyet->count()
        ]);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        // 
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }
}
