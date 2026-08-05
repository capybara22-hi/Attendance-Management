<?php

namespace App\Console\Commands;

use App\Services\CameraService;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\DB;

class SyncCameraUsers extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'camera:sync-users';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Đồng bộ danh sách nhân viên từ thiết bị camera vào database';

    /**
     * Execute the console command.
     *
     * @return int
     */
    public function handle(CameraService $cameraService)
    {
        $users = $cameraService->get_list_user();

        $data = [];

        // Update danh sách nhân viên
        foreach ($users as $user) {
            $data[] = [
                'employeeNo' => $user['employeeNo'],
                'name' => $user['name'],
                'department_id' => $user['groupId'],
                'gender' => null,
                'phone_number'  => null,
                'bank_name' => null,
                'bank_account_number' => null,
                'status' => null,
                'image' => $user['faceURL'] ?? null,
                'created_at'    => now(),
                'updated_at'    => now(),
            ];
        }

        DB::table('users')->upsert(
            $data,
            ['employeeNo'],
            [
                'name',
                'department_id',
                'gender',
                'email',
                'phone_number',
                'bank_name',
                'bank_account_number',
                'status',
                'image',
                'updated_at'
            ]
        );

        $this->info('Đồng bộ ' . count($data) . ' nhân viên thành công!');

        return Command::SUCCESS;
    }
}
