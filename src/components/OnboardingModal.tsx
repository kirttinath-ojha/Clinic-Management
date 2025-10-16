import { useState, useEffect } from "react";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
    DialogFooter,
} from "@/components/ui/dialog";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { Hospital, Mail, Phone, User, MapPin } from "lucide-react";
import { BASE_URL } from "../Url";
import { useMutation, useQuery } from "@tanstack/react-query";
// Import React Select
import ReactSelect from "react-select";

interface OnboardingModalProps {
    isOpen: boolean;
    onClose: () => void;
    selectedTier: string;
}

interface Facility {
    facility_id: string;
    facility_name: string;
}

// Define option type for React Select
interface SelectOption {
    value: string;
    label: string;
}

interface ClinicDetails {
    clinicName: string;
    clinicCode: string;
    clinicType: string;
    numberOfProviders: string;
    contactName: string;
    email: string;
    phone: string;
    city: string;
    state: string;
    postalCode: string;
    country: string;
    clinicRegistrationId: string;
    status: string;
    choosen_facilities: Facility[];
    clinicStartDate: string;
}

// Define the response type from the API
interface ClinicDetailsResponse {
    statusCode: number;
    success: boolean;
    data?: unknown;
    message?: string;
}

// Define facility response type
interface FacilityResponse {
    statusCode: number;
    data: {
        facility_id: string;
        facility_name: string;
    }[];
}

// Define error type
interface ApiError {
    message?: string;
    status?: number;
}

// Define validation error state interface
interface ValidationErrors {
    [key: string]: string;
}

// Fetch facility list
async function fetchFacilities(): Promise<FacilityResponse> {
    const response = await fetch(
        `${BASE_URL}/authorization-service/clinic/get-clinic-facility`,
        {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        }
    );

    if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || "Failed to fetch facilities");
    }

    return response.json();
}

// Save clinic details
async function saveClinicDetails(
    formData: ClinicDetails
): Promise<ClinicDetailsResponse> {
    const response = await fetch(
        `${BASE_URL}/authorization-service/authorization/save-clinic-details`,
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
        }
    );
    if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || "Failed to save clinic details");
    }

    return response.json();
}

export function OnboardingModal({
    isOpen,
    onClose,
    selectedTier,
}: OnboardingModalProps) {
    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState<ClinicDetails>({
        clinicName: "",
        clinicCode: "",
        clinicType: "",
        numberOfProviders: "",
        contactName: "",
        email: "",
        phone: "",
        city: "",
        state: "",
        postalCode: "",
        country: "",
        clinicRegistrationId: "",
        status: "Pending",
        choosen_facilities: [],
        clinicStartDate: "",
    });

    // Add validation errors state
    const [errors, setErrors] = useState<ValidationErrors>({});

    // Fetch facilities using react-query
    const {
        data: facilitiesData,
        isLoading: isLoadingFacilities,
        error: facilitiesError,
    } = useQuery<FacilityResponse, ApiError>({
        queryKey: ["facilities"],
        queryFn: fetchFacilities,
        enabled: isOpen, // Only fetch when modal is open
    });

    // Map the backend facility format to React Select options
    const facilityOptions: SelectOption[] = (facilitiesData?.data || []).map(
        (facility) => ({
            value: facility.facility_id,
            label: facility.facility_name,
        })
    );

    // Handle selected facilities in React Select format
    const [selectedFacilityOptions, setSelectedFacilityOptions] = useState<
        SelectOption[]
    >([]);

    // Update formData when selectedFacilityOptions changes
    useEffect(() => {
        const selectedFacilities = selectedFacilityOptions.map((option) => ({
            facility_id: option.value,
            facility_name: option.label,
        }));

        setFormData((prev) => ({
            ...prev,
            choosen_facilities: selectedFacilities,
        }));
    }, [selectedFacilityOptions]);

    const mutation = useMutation<
        ClinicDetailsResponse,
        ApiError,
        ClinicDetails
    >({
        mutationFn: (data: ClinicDetails) => saveClinicDetails(data),
        onSuccess: (data) => {
            if (data?.statusCode === 200) {
                toast.success( data?.message || "Clinic details saved successfully!");
                resetFormData();
                onClose();
            } else {
                toast.error(data?.message || "Failed to save clinic details");
            }
        },
        onError: (error) => {
            toast.error( error?.message ||"An error occurred while saving clinic details");
        },
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));

        // Clear error for this field when user starts typing
        if (errors[name]) {
            setErrors((prev) => ({ ...prev, [name]: "" }));
        }
    };

    const handleSelectChange = (name: string, value: string) => {
        setFormData((prev) => ({ ...prev, [name]: value }));

        // Clear error for this field when user makes a selection
        if (errors[name]) {
            setErrors((prev) => ({ ...prev, [name]: "" }));
        }
    };

    // Validate step 1
    const validateStep1 = () => {
        const newErrors: ValidationErrors = {};

        if (!formData.clinicName.trim()) {
            newErrors.clinicName = "Clinic name is required";
        }

        if (!formData.clinicCode.trim()) {
            newErrors.clinicCode = "Clinic code is required";
        }

        if (formData.choosen_facilities.length === 0) {
            newErrors.choosen_facilities =
                "At least one facility must be selected";
        }

        if (!formData.clinicType) {
            newErrors.clinicType = "Clinic type is required";
        }

        if (!formData.numberOfProviders) {
            newErrors.numberOfProviders = "Number of providers is required";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    // Validate step 2
    const validateStep2 = () => {
        const newErrors: ValidationErrors = {};
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const phoneRegex = /^\(\d{3}\) \d{3}-\d{4}$|^\d{10}$/;

        if (!formData.contactName.trim()) {
            newErrors.contactName = "Contact name is required";
        }

        if (!formData.email.trim()) {
            newErrors.email = "Email is required";
        } else if (!emailRegex.test(formData.email)) {
            newErrors.email = "Please enter a valid email address";
        }

        if (!formData.phone.trim()) {
            newErrors.phone = "Phone number is required";
        } else if (!phoneRegex.test(formData.phone)) {
            newErrors.phone = "Please enter a valid phone number";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    // Validate step 3
    const validateStep3 = () => {
        const newErrors: ValidationErrors = {};

        if (!formData.clinicRegistrationId.trim()) {
            newErrors.clinicRegistrationId =
                "Clinic registration ID is required";
        }
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    // Validate step 4
    const validateStep4 = () => {
        const newErrors: ValidationErrors = {};

        if (!formData.city.trim()) {
            newErrors.city = "City is required";
        }

        if (!formData.state.trim()) {
            newErrors.state = "State is required";
        }

        if (!formData.postalCode.trim()) {
            newErrors.postalCode = "Postal code is required";
        }

        if (!formData.country.trim()) {
            newErrors.country = "Country is required";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleNext = () => {
        let isValid = false;

        // Validate current step
        switch (step) {
            case 1:
                isValid = validateStep1();
                break;
            case 2:
                isValid = validateStep2();
                break;
            case 3:
                isValid = validateStep3();
                break;
            default:
                isValid = true;
        }

        // Only proceed if validation passes
        if (isValid) {
            setStep((prev) => prev + 1);
        } else {
            toast.error("Please fill in all required fields");
        }
    };

    const handleBack = () => {
        setStep((prev) => prev - 1);
        // Clear errors when going back
        setErrors({});
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        // Validate final step before submission
        if (validateStep4()) {
            mutation.mutate(formData);
        } else {
            toast.error("Please fill in all required fields");
        }
    };

    const resetFormData = () => {
        setFormData({
            clinicName: "",
            clinicCode: "",
            clinicType: "",
            numberOfProviders: "",
            contactName: "",
            email: "",
            phone: "",
            city: "",
            state: "",
            postalCode: "",
            country: "",
            clinicRegistrationId: "",
            status: "Pending",
            choosen_facilities: [],
            clinicStartDate: "",
        });
        setSelectedFacilityOptions([]);
        setErrors({});
        setStep(1);
    };

    const handleModalClose = () => {
        resetFormData();
        onClose();
    };

    const renderStep = () => {
        switch (step) {
            case 1:
                return (
                    <div className="space-y-6 py-4">
                        <div className="flex items-center gap-4 p-4 bg-secondary/50 rounded-xl">
                            <Hospital className="h-6 w-6 text-primary" />
                            <div>
                                <h3 className="font-medium text-foreground">
                                    Selected Plan
                                </h3>
                                <p className="text-sm text-muted-foreground">
                                    {selectedTier}
                                </p>
                            </div>
                        </div>

                        <div className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="clinicName">
                                    Clinic Name
                                    <span className="text-red-500">*</span>
                                </Label>
                                <Input
                                    id="clinicName"
                                    name="clinicName"
                                    value={formData.clinicName}
                                    onChange={handleChange}
                                    placeholder="Enter clinic name"
                                    className={`glass-input ${
                                        errors.clinicName
                                            ? "border-red-500"
                                            : ""
                                    }`}
                                    required
                                />
                                {errors.clinicName && (
                                    <p className="text-sm text-red-500 mt-1">
                                        {errors.clinicName}
                                    </p>
                                )}
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="clinicCode">
                                    Clinic Code
                                    <span className="text-red-500">*</span>
                                </Label>
                                <Input
                                    id="clinicCode"
                                    name="clinicCode"
                                    value={formData.clinicCode}
                                    onChange={handleChange}
                                    placeholder="Enter clinic code"
                                    className={`glass-input ${
                                        errors.clinicCode
                                            ? "border-red-500"
                                            : ""
                                    }`}
                                    required
                                />
                                {errors.clinicCode && (
                                    <p className="text-sm text-red-500 mt-1">
                                        {errors.clinicCode}
                                    </p>
                                )}
                            </div>

                            {/* Facilities Multi-Select using React Select */}
                            <div className="space-y-2">
                                <Label htmlFor="facilities">
                                    Facilities
                                    <span className="text-red-500">*</span>
                                </Label>
                                <ReactSelect
                                    isMulti
                                    options={facilityOptions}
                                    value={selectedFacilityOptions}
                                    onChange={(newValue) => {
                                        setSelectedFacilityOptions(
                                            newValue as SelectOption[]
                                        );
                                        if (errors.choosen_facilities) {
                                            setErrors((prev) => ({
                                                ...prev,
                                                choosen_facilities: "",
                                            }));
                                        }
                                    }}
                                    placeholder="Select facilities"
                                    isLoading={isLoadingFacilities}
                                    closeMenuOnSelect={false}
                                    isDisabled={
                                        isLoadingFacilities || !!facilitiesError
                                    }
                                    noOptionsMessage={() =>
                                        facilitiesError
                                            ? "Error loading facilities"
                                            : "No facilities available"
                                    }
                                    className={
                                        errors.choosen_facilities
                                            ? "react-select-error"
                                            : ""
                                    }
                                />
                                {errors.choosen_facilities && (
                                    <p className="text-sm text-red-500 mt-1">
                                        {errors.choosen_facilities}
                                    </p>
                                )}
                                {facilitiesError && (
                                    <p className="text-sm text-red-500 mt-1">
                                        Error loading facilities
                                    </p>
                                )}
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="clinicType">
                                    Clinic Type
                                    <span className="text-red-500">*</span>
                                </Label>
                                <Select
                                    value={formData.clinicType}
                                    onValueChange={(value) =>
                                        handleSelectChange("clinicType", value)
                                    }
                                    required
                                >
                                    <SelectTrigger
                                        id="clinicType"
                                        className={`glass-input ${
                                            errors.clinicType
                                                ? "border-red-500"
                                                : ""
                                        }`}
                                    >
                                        <SelectValue placeholder="Select clinic type" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="primary">
                                            Primary Care
                                        </SelectItem>
                                        <SelectItem value="specialty">
                                            Specialty Care
                                        </SelectItem>
                                        <SelectItem value="dental">
                                            Dental
                                        </SelectItem>
                                        <SelectItem value="urgent">
                                            Urgent Care
                                        </SelectItem>
                                        <SelectItem value="other">
                                            Others
                                        </SelectItem>
                                    </SelectContent>
                                </Select>
                                {errors.clinicType && (
                                    <p className="text-sm text-red-500 mt-1">
                                        {errors.clinicType}
                                    </p>
                                )}
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="numberOfProviders">
                                    Number of Providers
                                    <span className="text-red-500">*</span>
                                </Label>
                                <Select
                                    value={formData.numberOfProviders}
                                    onValueChange={(value) =>
                                        handleSelectChange(
                                            "numberOfProviders",
                                            value
                                        )
                                    }
                                    required
                                >
                                    <SelectTrigger
                                        id="numberOfProviders"
                                        className={`glass-input ${
                                            errors.numberOfProviders
                                                ? "border-red-500"
                                                : ""
                                        }`}
                                    >
                                        <SelectValue placeholder="Select number of providers" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="1-5">1-5</SelectItem>
                                        <SelectItem value="6-15">
                                            6-15
                                        </SelectItem>
                                        <SelectItem value="16-30">
                                            16-30
                                        </SelectItem>
                                        <SelectItem value="31-50">
                                            31-50
                                        </SelectItem>
                                        <SelectItem value="50+">50+</SelectItem>
                                    </SelectContent>
                                </Select>
                                {errors.numberOfProviders && (
                                    <p className="text-sm text-red-500 mt-1">
                                        {errors.numberOfProviders}
                                    </p>
                                )}
                            </div>
                        </div>
                    </div>
                );
            case 2:
                return (
                    <div className="space-y-6 py-4">
                        <div className="bg-secondary/50 p-4 rounded-xl space-y-1">
                            <h3 className="font-medium text-foreground flex items-center gap-2">
                                <User className="h-4 w-4 text-primary" />
                                Contact Information
                            </h3>
                            <p className="text-sm text-muted-foreground">
                                How we can reach you regarding your onboarding.
                            </p>
                        </div>

                        <div className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="contactName">
                                    Contact Name
                                    <span className="text-red-500">*</span>
                                </Label>
                                <Input
                                    id="contactName"
                                    name="contactName"
                                    value={formData.contactName}
                                    onChange={handleChange}
                                    placeholder="Enter your full name"
                                    className={`glass-input ${
                                        errors.contactName
                                            ? "border-red-500"
                                            : ""
                                    }`}
                                    required
                                />
                                {errors.contactName && (
                                    <p className="text-sm text-red-500 mt-1">
                                        {errors.contactName}
                                    </p>
                                )}
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="email">
                                        Email Address
                                        <span className="text-red-500">*</span>
                                    </Label>
                                    <div className="relative">
                                        <Input
                                            id="email"
                                            name="email"
                                            type="email"
                                            value={formData.email}
                                            onChange={handleChange}
                                            placeholder="you@example.com"
                                            className={`glass-input pl-10 ${
                                                errors.email
                                                    ? "border-red-500"
                                                    : ""
                                            }`}
                                            required
                                        />
                                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                                    </div>
                                    {errors.email && (
                                        <p className="text-sm text-red-500 mt-1">
                                            {errors.email}
                                        </p>
                                    )}
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="phone">
                                        Phone Number
                                        <span className="text-red-500">*</span>
                                    </Label>
                                    <div className="relative">
                                        <Input
                                            id="phone"
                                            name="phone"
                                            type="tel"
                                            value={formData.phone}
                                            onChange={handleChange}
                                            placeholder="(123) 456-7890"
                                            className={`glass-input pl-10 ${
                                                errors.phone
                                                    ? "border-red-500"
                                                    : ""
                                            }`}
                                            required
                                        />
                                        <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                                    </div>
                                    {errors.phone && (
                                        <p className="text-sm text-red-500 mt-1">
                                            {errors.phone}
                                        </p>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                );

            case 3:
                return (
                    <div className="space-y-6 py-4">
                        <div className="bg-secondary/50 p-4 rounded-xl space-y-1">
                            <h3 className="font-medium text-foreground flex items-center gap-2">
                                <User className="h-4 w-4 text-primary" />
                                Information
                            </h3>
                            <p className="text-sm text-muted-foreground">
                                Provide your role and clinic registration
                                details.
                            </p>
                        </div>
                        <div className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="clinicRegistrationId">
                                    Clinic Registration ID
                                    <span className="text-red-500">*</span>
                                </Label>
                                <Input
                                    id="clinicRegistrationId"
                                    name="clinicRegistrationId"
                                    value={formData.clinicRegistrationId}
                                    onChange={handleChange}
                                    placeholder="Enter clinic registration ID"
                                    className={`glass-input ${
                                        errors.clinicRegistrationId
                                            ? "border-red-500"
                                            : ""
                                    }`}
                                    required
                                />
                                {errors.clinicRegistrationId && (
                                    <p className="text-sm text-red-500 mt-1">
                                        {errors.clinicRegistrationId}
                                    </p>
                                )}
                            </div>
                        </div>
                        <div className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="clinicStartDate">
                                    Clinic Start Date
                                </Label>
                                <Input
                                    id="clinicStartDate"
                                    name="clinicStartDate"
                                    type="date" // Use date input type
                                    value={formData.clinicStartDate}
                                    onChange={handleChange}
                                    placeholder="Enter clinic start date"
                                    className={`glass-input ${
                                        errors.clinicStartDate
                                            ? "border-red-500"
                                            : ""
                                    }`}
                                    required
                                />
                                {errors.clinicStartDate && (
                                    <p className="text-sm text-red-500 mt-1">
                                        {errors.clinicStartDate}
                                    </p>
                                )}
                            </div>
                        </div>
                    </div>
                );

            case 4:
                return (
                    <div className="space-y-6 py-4">
                        <div className="bg-secondary/50 p-4 rounded-xl space-y-1">
                            <h3 className="font-medium text-foreground flex items-center gap-2">
                                <MapPin className="h-4 w-4 text-primary" />
                                Clinic Address
                            </h3>
                            <p className="text-sm text-muted-foreground">
                                The location of your clinic.
                            </p>
                        </div>

                        <div className="space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="city">
                                        City
                                        <span className="text-red-500">*</span>
                                    </Label>
                                    <Input
                                        id="city"
                                        name="city"
                                        value={formData.city}
                                        onChange={handleChange}
                                        placeholder="Enter city"
                                        className={`glass-input ${
                                            errors.city ? "border-red-500" : ""
                                        }`}
                                        required
                                    />
                                    {errors.city && (
                                        <p className="text-sm text-red-500 mt-1">
                                            {errors.city}
                                        </p>
                                    )}
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="state">
                                        State
                                        <span className="text-red-500">*</span>
                                    </Label>
                                    <Input
                                        id="state"
                                        name="state"
                                        value={formData.state}
                                        onChange={handleChange}
                                        placeholder="Enter state"
                                        className={`glass-input ${
                                            errors.state ? "border-red-500" : ""
                                        }`}
                                        required
                                    />
                                    {errors.state && (
                                        <p className="text-sm text-red-500 mt-1">
                                            {errors.state}
                                        </p>
                                    )}
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="postalCode">
                                        Postal Code
                                        <span className="text-red-500">*</span>
                                    </Label>
                                    <Input
                                        id="postalCode"
                                        name="postalCode"
                                        value={formData.postalCode}
                                        onChange={handleChange}
                                        placeholder="Enter postal code"
                                        className={`glass-input ${
                                            errors.postalCode
                                                ? "border-red-500"
                                                : ""
                                        }`}
                                        required
                                    />
                                    {errors.postalCode && (
                                        <p className="text-sm text-red-500 mt-1">
                                            {errors.postalCode}
                                        </p>
                                    )}
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="country">
                                        Country
                                        <span className="text-red-500">*</span>
                                    </Label>
                                    <Input
                                        id="country"
                                        name="country"
                                        value={formData.country}
                                        onChange={handleChange}
                                        placeholder="Enter country"
                                        className={`glass-input ${
                                            errors.country
                                                ? "border-red-500"
                                                : ""
                                        }`}
                                        required
                                    />
                                    {errors.country && (
                                        <p className="text-sm text-red-500 mt-1">
                                            {errors.country}
                                        </p>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                );
            default:
                return null;
        }
    };

    return (
        <Dialog open={isOpen} onOpenChange={handleModalClose}>
            <DialogContent className="sm:max-w-[525px] glass-card border-0">
                <DialogHeader>
                    <DialogTitle className="text-center text-xl">
                        Clinic Onboarding Request
                    </DialogTitle>
                    <DialogDescription className="text-center">
                        Complete the form below to begin your clinic onboarding
                        process.
                    </DialogDescription>
                </DialogHeader>

                <form onSubmit={handleSubmit}>
                    {/* Progress indicator */}
                    <div className="flex items-center justify-center mb-4">
                        {[1, 2, 3, 4].map((i) => (
                            <div key={i} className="flex items-center">
                                <div
                                    className={`w-8 h-8 rounded-full flex items-center justify-center ${
                                        step >= i
                                            ? "bg-primary text-white"
                                            : "bg-secondary text-foreground/50"
                                    }`}
                                >
                                    {i}
                                </div>
                                {i < 4 && (
                                    <div
                                        className={`h-0.5 w-10 ${
                                            step > i
                                                ? "bg-primary"
                                                : "bg-secondary"
                                        }`}
                                    />
                                )}
                            </div>
                        ))}
                    </div>

                    {renderStep()}

                    <DialogFooter className="mt-6 flex justify-between sm:justify-between gap-2">
                        {step > 1 && (
                            <Button
                                type="button"
                                variant="outline"
                                onClick={handleBack}
                                className="glass-input hover:bg-secondary/50"
                            >
                                Back
                            </Button>
                        )}
                        {step < 4 ? (
                            <Button
                                type="button"
                                onClick={handleNext}
                                className="ml-auto bg-primary hover:bg-primary/90 text-white"
                            >
                                Next
                            </Button>
                        ) : (
                            <Button
                                type="submit"
                                className="ml-auto bg-primary hover:bg-primary/90 text-white"
                                disabled={mutation.isPending}
                            >
                                {mutation.isPending
                                    ? "Submitting..."
                                    : "Submit"}
                            </Button>
                        )}
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}
