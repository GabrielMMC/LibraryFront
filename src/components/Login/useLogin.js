import { post } from "utils/requests";
import { useForm } from "react-hook-form";
import { useMutation } from "react-query";
import { API_URL } from "utils/variables";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { login, mudarUser } from "components/actions/AppActions";

const useLogin = () => {

    const navigate = useNavigate();
    const { register, handleSubmit, formState: { errors } } = useForm();
    const user = useSelector(store => store.AppReducer.user);
    const dispatch = useDispatch();

    const { mutate: loginMutate } = useMutation(async (data) => {
        return await post(`${API_URL}/auth/login`, JSON.stringify(data));
    }, {
        onSuccess: async (data) => {
            if (data?.httpCode === 200) {
                localStorage.setItem("token", data?.access_token);
                localStorage.setItem("user", JSON.stringify(data?.user));

                dispatch(login({ token: data?.access_token, user: data?.user }));

                console.log('uais adas d', data?.user?.email)

                if (data?.user?.email === 'admin@admin.com') navigate("/admin/dashboard")
                else navigate("/")

                // navigate("/admin/dashboard");
            } else throw Error;
        },
        onError: () => console.log("E-mail ou senha errados")
    });

    const onSubmit = handleSubmit(loginMutate);

    return {
        errors,
        register,
        onSubmit
    }
}

export default useLogin;