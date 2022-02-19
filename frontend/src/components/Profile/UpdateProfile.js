import React, {useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {updateUserAction} from "../../redux/actions/users/usersActions";
import SuccessMessage from '../DisplayMessage/SuccessMessage';

const UpdateProfile = ({history}) => {

  const userLogin = useSelector(state => state.userLogin);
  const { userInfo } = userLogin;

  const [name, setName] = useState(userInfo ? userInfo.name : '');
  const [email, setEmail] = useState(userInfo ? userInfo.email : '');
  const [password, setPassword] = useState('');

  //Get the updated user details from store and display message
  const updatedUser = useSelector(state => state.updatedUser);
  const { user, loading, success } = updatedUser;

  //Dispatch
  const dispatch = useDispatch();

  //Submit
  const formSubmitHandler = e => {
    e.preventDefault();
    dispatch(updateUserAction(name, email, password));
  };


  return (
      <div className='row container-height'>
        <div className='col-lg-6 col-md-6 m-auto'>
          <div className='container'>
            {user && !loading && success && (
                <SuccessMessage message='Updated successfully. Logout and login with your new credentials' />
            )}
            <h1 className='text-center'>Update</h1>
            <form onSubmit={formSubmitHandler}>
              <fieldset>
                <div className='form-group'>
                  <label htmlFor='exampleInputName1'>Name</label>
                  <input
                      value={name}
                      onChange={e => setName(e.target.value)}
                      type='text'
                      className='form-control'
                      id='exampleInputName1'
                      aria-describedby='nameHelp'
                      placeholder='Enter Name'
                  />
                </div>
                <div className='form-group'>
                  <label htmlFor='exampleInputEmail1'>Email address</label>
                  <input
                      value={email}
                      onChange={e => setEmail(e.target.value)}
                      type='email'
                      className='form-control'
                      id='exampleInputEmail1'
                      aria-describedby='emailHelp'
                      placeholder='Enter email'
                  />
                </div>
                <div className='form-group'>
                  <label htmlFor='exampleInputPassword1'>Password</label>
                  <input
                      value={password}
                      onChange={e => setPassword(e.target.value)}
                      type='password'
                      className='form-control'
                      id='exampleInputPassword1'
                      placeholder='Password'
                  />
                </div>
                <button type='submit' className='btn btn-primary m-auto'>
                  Update your profile
                </button>
              </fieldset>
            </form>
          </div>
        </div>
      </div>
  );
};
;

export default UpdateProfile;