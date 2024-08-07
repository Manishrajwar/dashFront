import { useContext, useEffect, useState } from "react";
import "./task.css";
import { AppContext } from "../../Context/AppContext";
import toast from "react-hot-toast";
import {
  makeAuthenticatedGETRequest,
  makeAuthenticatedPUTRequest,
} from "../../services/serverHelper";
import { endpoints } from "../../services/api";
import { useSelector } from "react-redux";

function EmployeeProjectTasks() {
  const { currentProjectOpen } = useContext(AppContext);
  const { accessToken } = useSelector((state) => state.auth);
  const [allTask, setAllTask] = useState([]);

  const getEmployeeTask = async () => {
    const resp = await makeAuthenticatedGETRequest(
      endpoints.GET_PROJECT_MEMBER_TASK + `/${currentProjectOpen?._id}`,
      accessToken
    );
    console.log("rsp", resp);
    if (resp?.success) {
      setAllTask(resp?.allTask);
    }
  };

  const statusChangeHandler = async (status, taskId) => {
    const toastID = toast.loading("Loading...");
    const resp = await makeAuthenticatedPUTRequest(
      endpoints.UPDATE_TASK_STATUS_API,
      { status, taskId },
      accessToken
    );
    if (resp?.success) {
      getEmployeeTask();
      toast.success("Successfuly updated");
    } else {
      toast.error(resp?.message);
    }
    toast.dismiss(toastID);
  };

  //  go back to the project page protector
  useEffect(() => {
    if (!currentProjectOpen) {
    }

    getEmployeeTask();
 // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <div className="proTaskCont">
        <nav>
          <h2>Project Task</h2>
          <button>
            {" "}
            <span>Assign Task</span>
          </button>
        </nav>

        <div className="allTasksCont">
          <div class="relative overflow-x-auto">
            <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
              <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" class="px-6 py-3">
                    Title
                  </th>

                  <th scope="col" class="px-6 py-3">
                    Due Date
                  </th>
                  <th scope="col" class="px-6 py-3">
                    Priority
                  </th>
                  <th scope="col" class="px-6 py-3">
                    Description
                  </th>
                  <th scope="col" class="px-6 py-3">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody>
                {allTask?.map((task, index) => (
                  <tr
                    key={index}
                    class="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                  >
                    <td class="px-6 py-4">{task?.title}</td>
                    <td className="px-6 py-4">
                      {new Date(task?.dueDate).toLocaleDateString("en-GB", {
                        day: "2-digit",
                        month: "short",
                        year: "numeric",
                      })}
                    </td>

                    <td class="px-6 py-4">{task?.priority}</td>
                    <td class="px-6 py-4">{task?.description}</td>
                    <td class="px-6 py-4">
                      <select
                        name="status"
                        onChange={(e) =>
                          statusChangeHandler(e.target.value, task?._id)
                        }
                        value={task?.status}
                        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      >
                        <option value="Not Started">Not Started</option>
                        <option value="Started">Started</option>
                        <option value="Pending">Pending</option>
                        <option value="Done">Done</option>
                      </select>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}

export default EmployeeProjectTasks;
