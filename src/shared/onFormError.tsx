import { AxiosError } from "axios";

export const onFormError = (error: AxiosError<ResourceError>, fn: (errors: ResourceError) => void) => {
  if (error.response?.status === 422) {
    fn.call(undefined, error.response.data)
  }
  throw error
}