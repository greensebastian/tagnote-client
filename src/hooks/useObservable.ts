import { useEffect } from "react";
import { Observable } from "rxjs";

const useObservable = <T>(
  observable: Observable<T>,
  setter: (newValue: T) => void
) => {
  useEffect(() => {
    const subscription = observable.subscribe((result) => {
      setter(result);
    });

    return () => subscription.unsubscribe();
  }, [observable, setter]);
};

export default useObservable;
