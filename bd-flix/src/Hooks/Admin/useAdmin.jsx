import { useEffect, useState } from "react"

const useAdmin = email => {
    const [isAdmin, setIsAdmin] = useState(false);
    const [isAdminLoading, setIsAdminLoading] = useState(true);
    console.log(email, isAdmin, 'admin hook')
    useEffect(() => {
        if (email) {
            fetch(`http://localhost:5000/allUsers/admin/${email}`)
                .then(res => res.json())
                .then(data => {
                    console.log(data, 'admin');
                    setIsAdmin(data.isAdmin);
                    setIsAdminLoading(false);
                })
        }
    }, [email])
    return [isAdmin, isAdminLoading]
}

export default useAdmin;