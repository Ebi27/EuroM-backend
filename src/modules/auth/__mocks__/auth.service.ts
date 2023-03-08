import { SignupDtoStub } from '../../auth/tests/stubs/user.stub';

export const AuthService = jest.fn().mockReturnValue({
	login: jest.fn().mockResolvedValue({
		login: jest.fn().mockResolvedValue(SignupDtoStub()),
		signup: jest.fn().mockResolvedValue(SignupDtoStub()),
		signout: jest.fn().mockResolvedValue(SignupDtoStub()),
		resetPassword: jest.fn().mockResolvedValue(SignupDtoStub()),
	}),
})
