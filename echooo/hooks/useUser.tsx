/**
 * Interface segregation Principle:UserContextType arayüzü, kullanıcı bilgilerini ve abonelik bilgilerini içerir.
 * Kullanıcılar, sadece ihtiyaç duydukları bilgileri almak için bu arayüzü kullanabilirler.
 */
import { Subscription, UserDetails } from "@/types";
import { User } from "@supabase/auth-helpers-nextjs";
import {
	useSessionContext,
	useUser as useSupaUser,
} from "@supabase/auth-helpers-react";
import { createContext, useContext, useEffect, useState } from "react";

// Kullanıcı bağlamı tipini tanımla
type UserContextType = {
	accessToken: string | null;
	user: User | null;
	userDetails: UserDetails | null;
	isLoading: boolean;
	subscription: Subscription | null;
};

// Kullanıcı bağlamını oluştur
export const UserContext = createContext<UserContextType | undefined>(
	undefined
);

// MyUserContextProvider bileşeni için prop türünü tanımla
export interface Props {
	[propName: string]: any;
}

// Ana kullanıcı bağlamı sağlayıcı bileşeni
export const MyUserContextProvider = (props: Props) => {
	// useSessionContext hook'undan oturum, yükleme durumu ve Supabase istemcisini al
	const {
		session,
		isLoading: isLoadingUser,
		supabaseClient: supabase,
	} = useSessionContext();

	// useSupaUser hook'undan geçerli kullanıcıyı al
	const user = useSupaUser();

	// Oturumdan erişim belirtecini al
	const accessToken = session?.access_token ?? null;

	// Veri yükleme, kullanıcı ayrıntıları ve abonelik için durum değişkenlerini ayarla
	const [isLoadingData, setIsLoadingData] = useState(false);
	const [userDetails, setUserDetails] = useState<UserDetails | null>(null);
	const [subscription, setSubscription] = useState<Subscription | null>(null);

	// Kullanıcı ayrıntılarını ve aboneliği Supabase veritabanından almak için işlevleri tanımla
	const getUserDatails = () => supabase.from("users").select("*").single();
	const getSubscription = () =>
		supabase
			.from("subscription")
			.select("*, prices(*, products(*))")
			.in("status", ["trialing", "active"])
			.single();

	// Kullanıcı değiştiğinde veya bileşen oluşturulduğunda kullanıcı ayrıntılarını ve aboneliği al
	useEffect(() => {
		if (user && !isLoadingData && !userDetails && !subscription) {
			setIsLoadingData(true);

			Promise.allSettled([getUserDatails(), getSubscription()]).then(
				(results) => {
					const userDetailsPromise = results[0];
					const subscriptionPromise = results[1];

					if (userDetailsPromise.status === "fulfilled") {
						setUserDetails(userDetailsPromise.value.data as UserDetails);
					}

					if (subscriptionPromise.status === "fulfilled") {
						setSubscription(subscriptionPromise.value.data as Subscription);
					}

					setIsLoadingData(false);
				}
			);
		} else if (!user && !isLoadingUser && !isLoadingData) {
			setUserDetails(null);
			setSubscription(null);
		}
	}, [user, isLoadingUser]);

	// Bağlam için sağlanacak değer nesnesini oluştur
	const value = {
		accessToken,
		user,
		userDetails,
		isLoading: isLoadingUser || isLoadingData,
		subscription,
	};

	// Kullanıcı bağlamı değerini alt bileşenlere sağla
	return <UserContext.Provider value={value} {...props} />;
};

// Kullanıcı bağlamına erişmek için özel hook'u tanımla
export const useUser = () => {
	const context = useContext(UserContext);
	if (context === undefined) {
		throw new Error('useUser must be used within a MyUserContextProvider');
	}

	return context;
};