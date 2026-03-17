<?php

namespace App\Console\Commands;

use App\Services\CameraService;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\DB;

class SyncUserEvent extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'camera:user-event';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Đồng bộ danh sách sự kiện nhân viên chấm công lưu vào database';

    /**
     * Execute the console command.
     *
     * @return int
     */
    public function handle(CameraService $cameraService)
    {
        $users = $cameraService->get_user();

        $data = [];

        foreach ($users as $user) {
            $data[] = [
                'employeeNo' => $user['employeeNoString'],
                'name' => $user['name'],
                'image' => $user['pictureURL'] ?? null,
                'time' => $user['time'],
                'created_at' => now(),
                'updated_at' => now(),
            ];
        }

        DB::table('log_user_event')->insert($data);

        $this->info('Đồng bộ ' . count($data) . ' lượt chấm công!');

        return Command::SUCCESS;
    }
}
