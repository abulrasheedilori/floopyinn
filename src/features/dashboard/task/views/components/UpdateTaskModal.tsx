import React, { useEffect } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useAppDispatch, useAppSelector } from '../../../../../common/reduxtk/hooks';
import { updateTask, TaskType } from '../../taskSlice';
import Select from 'react-select';
import { fetchMembers } from '../../../../auth/authSlice';
import { showToast } from '../../../../../common/middleware/showToast';
import { TaskTabType } from '../screens/TaskScreen';
import { IoClose } from 'react-icons/io5';

interface UpdateTaskModalProps {
    isOpen: boolean;
    onClose: () => void;
    task: TaskType;
}

const UpdateTaskModal: React.FC<UpdateTaskModalProps> = ({ isOpen, onClose, task }) => {
    const dispatch = useAppDispatch();
    const listOfMembers = useAppSelector(state => state.auth.members);

    useEffect(() => {
        dispatch(fetchMembers());
    }, [dispatch]);

    if (!isOpen) return null;

    const userOptions = listOfMembers.map(user => ({
        value: user.id || '',
        label: `${user.firstName} ${user.lastName}`,
    }));

    const validationSchema = Yup.object().shape({
        content: Yup.string().required('Content is required'),
        teamLead: Yup.string().required('A team lead is required'),
        members: Yup.array().min(1, 'At least one member must be selected').of(
            Yup.object().shape({
                value: Yup.string().required(),
                label: Yup.string().required(),
            })
        ),
        completionRate: Yup.number()
            .min(0, "Completion rate must be at least 0")
            .max(100, "Completion rate must be at most 100")
            .required('Completion rate is required'),
        expiryDate: Yup.string().required('Expiry date is required'),
    });

    const getTaskStatus = (completionRate: number) => {
        if (completionRate === 0) return TaskTabType.TODO;
        if (completionRate > 0 && completionRate < 100) return TaskTabType.ONGOING;
        return TaskTabType.COMPLETED;
    };

    const handleSubmit = async (values: Partial<TaskType>, { resetForm }: any) => {
        try {
            const updatedTask: TaskType = {
                title: values.title || "",
                createdBy: values.createdBy || new Date().toISOString(),
                updatedAt: new Date().toISOString(),
                content: values.content || "",
                flag: getTaskStatus(values.completionRate || 0),
                teamLead: values.teamLead || "",
                members: values.members || [],
                completionRate: values.completionRate || 0,
                expiryDate: values.expiryDate || new Date().toISOString(),
                createdAt: values.createdAt || new Date().toISOString(),
                id: values.id
            };
            const res = await dispatch(updateTask(updatedTask));
            console.log("RESULT: ", res);
            showToast("success", `${updatedTask.title} updated successfully`);
            resetForm();
            onClose();
        } catch (error: any) {
            showToast("info", error.message);
        }
    };

    return (
        <div className="fixed z-50 inset-0 flex items-center justify-center bg-slate-50 bg-opacity-10 transition-all delay-500 ease-in overflow-y-auto">
            <div className="bg-white p-6 rounded-lg shadow-lg w-96">
                <section className='flex flex-row justify-between items-center'>
                    <span className="text-xl font-bold mb-4">Edit Task</span>
                    <IoClose size={36} color='red' onClick={onClose} />
                </section>
                <Formik
                    initialValues={{
                        title: task.title,
                        content: task.content,
                        teamLead: task.teamLead,
                        createdAt: task.createdAt,
                        id: task.id,
                        members: task.members,
                        completionRate: task.completionRate,
                        expiryDate: task.expiryDate,
                    }}
                    validationSchema={validationSchema}
                    onSubmit={handleSubmit}
                >
                    {({ setFieldValue, values, errors, touched, isValid, isSubmitting }) => (
                        <Form>
                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700">Title</label>
                                <span>{values.title}</span>
                            </div>
                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700">Content</label>
                                <Field
                                    name="content"
                                    as="textarea"
                                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                                />
                                <ErrorMessage name="content" component="div" className="text-red-500 text-xs" />
                            </div>
                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700">Team Lead</label>
                                <Field name="teamLead" as="select" className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2">
                                    {listOfMembers.map(member => (
                                        <option key={member.id} value={member.email || ""}>{`${member.firstName} ${member.lastName}`}</option>
                                    ))}
                                </Field>
                                <ErrorMessage name="teamLead" component="div" className="text-red-500 text-xs" />
                            </div>
                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700">Members</label>
                                <Select
                                    isMulti
                                    name="members"
                                    options={userOptions.filter(option => !values.members.some(member => member.value === option.value))}
                                    value={values.members}
                                    onChange={selectedOptions => setFieldValue('members', selectedOptions)}
                                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                                    classNamePrefix="select"
                                />
                                {errors.members && touched.members && (
                                    <div className="text-red-500 text-xs">{errors.members.toString()}</div>
                                )}
                            </div>

                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700">Completion Rate</label>
                                <Field
                                    name="completionRate"
                                    type="number"
                                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                                />
                                <ErrorMessage name="completionRate" component="div" className="text-red-500 text-xs" />
                            </div>
                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700">Expiry Date</label>
                                <Field
                                    name="expiryDate"
                                    type="date"
                                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                                />
                                <ErrorMessage name="expiryDate" component="div" className="text-red-500 text-xs" />
                            </div>
                            <button
                                className={`w-full h-[50px] my-8 rounded-2xl ${isValid ? 'bg-black text-slate-200' : 'bg-gray-400 text-gray-700'}`}
                                type="submit" disabled={!isValid || isSubmitting}
                            >
                                {isSubmitting ? "Updating Task..." : "Update Task"}
                            </button>
                        </Form>
                    )}
                </Formik>
            </div>
        </div>
    );
};

export default UpdateTaskModal;
