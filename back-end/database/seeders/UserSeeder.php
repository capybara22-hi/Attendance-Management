<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $users = [
            [
                'employeeNo' => 'NV0001',
                'name' => 'Nguyễn Viết Tuấn',
                'department_id' => 1,
                'image' => null
            ],
            [
                'employeeNo' => 'NV0002',
                'name' => 'Nguyễn Văn A',
                'department_id' => 1,
                'image' => null
            ],
            [
                'employeeNo' => 'NV0003',
                'name' => 'Trần Thị B',
                'department_id' => 2,
                'image' => null
            ],
            [
                'employeeNo' => 'NV0004',
                'name' => 'Lê Văn C',
                'department_id' => 3,
                'image' => null
            ],
        ];

        foreach ($users as $user) {
            User::create($user);
        }
    }
}
