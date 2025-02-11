import React, { useEffect } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useAppDispatch, useAppSelector } from '../../../../../common/reduxtk/hooks';
import { createTask, TaskType } from '../../taskSlice';
import { TaskTabType } from './TaskScreen';
import { auth } from '../../../../../common/firebase';
import Select from 'react-select';
import { IoMdCloseCircleOutline } from 'react-icons/io';
import { fetchMembers } from '../../../../auth/authSlice';

interface AddTaskModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export interface MemberOption {
    value: string;
    label: string;
}


const AddTaskModal: React.FC<AddTaskModalProps> = ({ isOpen, onClose }) => {
    const dispatch = useAppDispatch();
    const listOfMembers = useAppSelector(state => state.auth.members)


    useEffect(() => {
        const getListOfMembers = async () => {
            await dispatch(fetchMembers);
        };
        getListOfMembers();
    }, [])

    if (!isOpen) return null;




    const initialValues: Omit<TaskType, 'id'> = {
        title: '',
        createdBy: "",
        createdAt: '',
        updatedAt: "",
        content: '',
        flag: TaskTabType.TODO,
        teamLead: null,
        members: [],
        completionRate: 0,
        expiryDate: '',
    };

    const userOptions: MemberOption[] = listOfMembers.map((user) => ({
        value: user.id || '',
        label: `${user.firstName} ${user.lastName}`,
    }));


    const validationSchema = Yup.object().shape({
        title: Yup.string().required('Title is required'),
        createdAt: Yup.string().required('Creation date is required'),
        updatedAt: Yup.number().nullable(),
        content: Yup.string().required('Content is required'),
        flag: Yup.mixed<TaskTabType>().oneOf(Object.values(TaskTabType)).required('Flag is required'),
        teamLead: Yup.array().max(1, 'Select only one member').required('A member is required'),
        members: Yup.array().min(1, 'At least one member must be selected').of(
            Yup.object().shape({
                value: Yup.string().required(),
                label: Yup.string().required(),
            })
        ),
        completionRate: Yup.number().min(0).max(100).required('Completion rate is required'),
        expiryDate: Yup.string().required('Expiry date is required'),
    });

    const handleSubmit = async (values: Omit<TaskType, 'id'>, { resetForm }: any) => {
        try {
            const task: TaskType = {
                createdAt: values.createdAt,
                title: values.title,
                createdBy: auth.currentUser?.displayName || null,
                updatedAt: values.updatedAt,
                content: values.content,
                flag: values.flag,
                teamLead: values.teamLead,
                members: values.members,
                completionRate: values.completionRate,
                expiryDate: values.expiryDate,
            };
            await dispatch(createTask(task));
            resetForm();
            onClose();
        } catch (error) {
            console.error('Error adding task:', error);
        }
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-slate-50 bg-opacity-10 transition-all delay-500 ease-in">
            <div className="bg-white p-6 rounded-lg shadow-lg w-96">
                <section className='flex flex-row justify-between items-center'>
                    <span></span>
                    <span className="text-xl font-bold mb-4">Add New Task</span>
                    <IoMdCloseCircleOutline size={24} color='red' onClick={onClose} />
                </section>

                <Formik
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    onSubmit={handleSubmit}
                >
                    {({ setFieldValue, errors, touched, values }) => (

                        <Form>
                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700">Title</label>
                                <Field
                                    name="title"
                                    type="text"
                                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                                />
                                <ErrorMessage name="title" component="div" className="text-red-500 text-sm" />
                            </div>
                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700">Created At</label>
                                <Field
                                    name="createdAt"
                                    type="date"
                                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                                />
                                <ErrorMessage name="createdAt" component="div" className="text-red-500 text-sm" />
                            </div>
                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700">Content</label>
                                <Field
                                    name="content"
                                    as="textarea"
                                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                                />
                                <ErrorMessage name="content" component="div" className="text-red-500 text-sm" />
                            </div>
                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700">Flag</label>
                                <Field
                                    name="flag"
                                    as="select"
                                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                                >
                                    {Object.values(TaskTabType).map((type) => (
                                        <option key={type} value={type}>
                                            {type}
                                        </option>
                                    ))}
                                </Field>
                                <ErrorMessage name="flag" component="div" className="text-red-500 text-sm" />
                            </div>
                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700">Team Lead</label>
                                <Field
                                    name="teamLead"
                                    as="select"
                                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                                >
                                    {listOfMembers.map((member) => (
                                        <option key={member.id} value={`${member.firstName} ${member.lastName}`}>
                                            {`${member.firstName} ${member.lastName}`}
                                        </option>
                                    ))}
                                </Field>
                                <ErrorMessage name="teamLead" component="div" className="text-red-500 text-sm" />
                            </div>
                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700">Members</label>
                                <Select
                                    isMulti
                                    name="members"
                                    options={userOptions}
                                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                                    classNamePrefix="select"
                                    value={values.members}
                                    onChange={(selectedOptions) => {
                                        setFieldValue('members', selectedOptions);
                                    }}
                                />
                                {errors && errors.members && touched.members ? (
                                    <div className="text-red-500 text-sm">{errors.members.toString()}</div>
                                ) : null}
                            </div>
                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700">Completion Rate</label>
                                <Field
                                    name="completionRate"
                                    type="number"
                                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                                />
                                <ErrorMessage name="completionRate" />
                            </div>
                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700">Created At</label>
                                <Field
                                    name="createdAt"
                                    type="date"
                                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                                />
                                <ErrorMessage name="createdAt" component="div" className="text-red-500 text-sm" />
                            </div>
                        </Form>)}
                </Formik>
            </div>
        </div>
    );
};

export default AddTaskModal;