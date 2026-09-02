/** @format */

import { Routes, Route, Navigate } from 'react-router-dom';
import AdminSidebar from '../../components/AdminSidebar';
import TeacherSidebar from '../../components/TeacherSidebar';
import DashboardAdmin from '../admin/DashboardAdmin';
import DashboardTeacher from '../teacher/DashboardTeacher';
import BuildingList from '../admin/buildings/BuildingList';
import BuildingCreate from '../admin/buildings/BuildingCreate';
import Login from '../auth/Login';
import Register from '../auth/Register';
import ProtectRoute from '../../components/ProtectRoute';
import TeacherList from '../admin/teachers/TeacherList';
import TeacherCreate from '../admin/teachers/TeacherCreate';
import BuildingUpdate from '../admin/buildings/BuildingUpdate';
import TeacherUpdate from '../admin/teachers/TeacherUpdate';
import ClassUpdate from '../admin/classrooms/ClassUpdate';
import ClassList from '../admin/classrooms/ClassList';
import ClassCreate from '../admin/classrooms/ClassCreate';
import StudentList from '../admin/students/StudentList';
import StudentCreate from '../admin/students/StudentCreate';
import StudentUpdate from '../admin/students/StudentUpdate';
import SubjectList from '../admin/subjects/SubjectList';
import SubjectCreate from '../admin/subjects/SubjectCreate';
import SubjectUpdate from '../admin/subjects/SubjectUpdate';
import ScheduleList from '../admin/schedules/ScheduleList';
import ScheduleCreate from '../admin/schedules/ScheduleCreate';
import ScheduleUpdate from '../admin/schedules/ScheduleUpdate';
import AttendanceList from '../admin/attendances/AttendanceList';
import Userlist from '../admin/users/Userlist';
import UserUpdate from '../admin/users/UserUpdate';
import ViewClass from '../teacher/ViewClass';
import TeacherClassList from '../admin/manageTeacherClass/TeacherClassList';
import TeacherClassCreate from '../admin/manageTeacherClass/TeacherClassCreate';
import TakeAttendance from '../teacher/Attendance/TakeAttendance';
import AttendanceReport from '../admin/attendances/AttendanceReport';
import TeacherClassUpdate from '../admin/manageTeacherClass/TeacherClassUpdate';

const AppRoute = () => {
  return (
    <Routes>
      <Route
        path='/'
        element={
          <Navigate
            to='/login'
            replace
          />
        }
      />
      {/* Public Routes */}
      <Route
        path='/login'
        element={<Login />}
      />
      <Route
        path='/register'
        element={<Register />}
      />
      <Route element={<ProtectRoute allowedRoles={['admin']} />}>
        <Route
          path='/adminSidebar'
          element={<AdminSidebar />}
        />
        <Route
          path='/dashboardAdmin'
          element={<DashboardAdmin />}
        />

        <Route
          path='/teacherclasslist'
          element={<TeacherClassList />}
        />
        <Route
          path='/teacherclasslist/teacherclasscreate'
          element={<TeacherClassCreate />}
        />
        <Route
          path='/teacherclass/teacherclassupdate/:id'
          element={<TeacherClassUpdate />}
        />

        <Route
          path='/userlist'
          element={<Userlist />}
        />
        <Route
          path='/user/userupdate/:id'
          element={<UserUpdate />}
        />

        <Route
          path='/buildinglist'
          element={<BuildingList />}
        />
        <Route
          path='/building/buildingcreate'
          element={<BuildingCreate />}
        />
        <Route
          path='/building/buildingupdate/:id'
          element={<BuildingUpdate />}
        />

        <Route
          path='/teacherlist'
          element={<TeacherList />}
        />
        <Route
          path='/teacher/teachercreate'
          element={<TeacherCreate />}
        />
        <Route
          path='/teacher/teacherupdate/:id'
          element={<TeacherUpdate />}
        />

        <Route
          path='/roomlist'
          element={<ClassList />}
        />
        <Route
          path='/room/roomcreate'
          element={<ClassCreate />}
        />
        <Route
          path='/room/roomupdate/:id'
          element={<ClassUpdate />}
        />

        <Route
          path='/studentlist'
          element={<StudentList />}
        />
        <Route
          path='/student/studentcreate'
          element={<StudentCreate />}
        />
        <Route
          path='/student/studentupdate/:id'
          element={<StudentUpdate />}
        />

        <Route
          path='/subjectlist'
          element={<SubjectList />}
        />
        <Route
          path='/subject/subjectcreate'
          element={<SubjectCreate />}
        />
        <Route
          path='/subject/subjectupdate/:id'
          element={<SubjectUpdate />}
        />

        <Route
          path='/schedulelist'
          element={<ScheduleList />}
        />
        <Route
          path='/schedule/schedulecreate'
          element={<ScheduleCreate />}
        />
        <Route
          path='/schedule/scheduleupdate/:id'
          element={<ScheduleUpdate />}
        />

        <Route
          path='/attendancelist'
          element={<AttendanceList />}
        />
        <Route
          path='/attendancereport'
          element={<AttendanceReport />}
        />
      </Route>
      //Route teacher
      <Route element={<ProtectRoute allowedRoles={['teacher']} />}>
        <Route
          path='/teacherSidebar'
          element={<TeacherSidebar />}
        />
        <Route
          path='/teacherSidebar/dashboardTeacher'
          element={<DashboardTeacher />}
        />

        <Route
          path='/viewclass'
          element={<ViewClass />}
        />

        <Route
          path='/takeattendance/:id'
          element={<TakeAttendance />}
        />
      </Route>
    </Routes>
  );
};

export default AppRoute;
